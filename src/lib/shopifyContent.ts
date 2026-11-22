import { storefrontApiRequest } from "@/lib/shopify";

/**
 * Shopify-backed content layer. Replaces the former Supabase tables/storage:
 *   - blog_posts      -> Shopify Blog articles (Online Store > Blog posts)
 *   - planners        -> Shopify metaobjects of type "planner" (Content > Metaobjects)
 *   - planner files   -> Shopify Files (referenced by the metaobject's `file` field)
 *   - planner_downloads (email capture) -> Shopify customers (Customers in admin)
 *
 * The Storefront access token needs these scopes:
 *   unauthenticated_read_content, unauthenticated_read_metaobjects
 */

// Handle of the Shopify blog that holds your articles (Online Store > Blog posts > blog name).
// New stores default to "news".
export const BLOG_HANDLE = "adhd-parenting-path";

// Metaobject definition type for planners (see scripts/shopify-setup.md).
export const PLANNER_METAOBJECT_TYPE = "planner";

/* ------------------------------ Blog ------------------------------ */

// Same shape the pages used with Supabase, so UI code stays unchanged.
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML
  cover_image: string;
  author_name: string;
  created_at: string; // published date
}

interface ShopifyArticleNode {
  id: string;
  title: string;
  handle: string;
  excerpt: string | null;
  contentHtml: string;
  publishedAt: string;
  image: { url: string; altText: string | null } | null;
  authorV2: { name: string } | null;
}

const ARTICLE_FIELDS = `
  id
  title
  handle
  excerpt
  contentHtml
  publishedAt
  image { url altText }
  authorV2 { name }
`;

const mapArticle = (a: ShopifyArticleNode): BlogPost => ({
  id: a.id,
  title: a.title,
  slug: a.handle,
  excerpt: a.excerpt ?? "",
  content: a.contentHtml ?? "",
  cover_image: a.image?.url ?? "",
  author_name: a.authorV2?.name ?? "Focusi Team",
  created_at: a.publishedAt,
});

const BLOG_ARTICLES_QUERY = `
  query BlogArticles($blog: String!, $first: Int!) {
    blog(handle: $blog) {
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        edges { node { ${ARTICLE_FIELDS} } }
      }
    }
  }
`;

const ARTICLE_BY_HANDLE_QUERY = `
  query ArticleByHandle($blog: String!, $handle: String!) {
    blog(handle: $blog) {
      articleByHandle(handle: $handle) { ${ARTICLE_FIELDS} }
    }
  }
`;

/** Published articles, newest first. Shopify only returns published articles to the Storefront API. */
export async function fetchBlogPosts(first = 50): Promise<BlogPost[]> {
  try {
    const data = await storefrontApiRequest(BLOG_ARTICLES_QUERY, { blog: BLOG_HANDLE, first });
    const edges: Array<{ node: ShopifyArticleNode }> = data?.data?.blog?.articles?.edges ?? [];
    return edges.map((e) => mapArticle(e.node));
  } catch (error) {
    console.error("Failed to load blog posts:", error);
    return [];
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const data = await storefrontApiRequest(ARTICLE_BY_HANDLE_QUERY, { blog: BLOG_HANDLE, handle: slug });
    const node: ShopifyArticleNode | null = data?.data?.blog?.articleByHandle ?? null;
    return node ? mapArticle(node) : null;
  } catch (error) {
    console.error("Failed to load blog post:", error);
    return null;
  }
}

/* ---------------------------- Planners ---------------------------- */

export interface Planner {
  id: string;
  title: string;
  description: string;
  file_url: string;
  icon: string;
  group_name: string;
  group_description: string;
  group_icon: string;
  sort_order: number;
  created_at: string;
}

interface MetaobjectField {
  key: string;
  value: string | null;
  reference?: { url?: string } | null;
}

interface PlannerNode {
  id: string;
  updatedAt: string;
  fields: MetaobjectField[];
}

const PLANNERS_QUERY = `
  query Planners($type: String!, $first: Int!) {
    metaobjects(type: $type, first: $first) {
      edges {
        node {
          id
          updatedAt
          fields {
            key
            value
            reference {
              ... on GenericFile { url }
            }
          }
        }
      }
    }
  }
`;

const mapPlanner = (node: PlannerNode): Planner => {
  const f = (key: string) => node.fields.find((x) => x.key === key);
  return {
    id: node.id,
    title: f("title")?.value ?? "",
    description: f("description")?.value ?? "",
    file_url: f("file")?.reference?.url ?? "",
    icon: (f("icon")?.value ?? "").trim().toLowerCase(), // optional; empty = automatic icon
    group_name: f("group_name")?.value ?? "",
    group_description: f("group_description")?.value ?? "",
    group_icon: (f("group_icon")?.value ?? "").trim().toLowerCase(), // optional; empty = default for the group
    sort_order: Number(f("sort_order")?.value ?? 0) || 0,
    created_at: node.updatedAt,
  };
};

/** Planners with a title and an uploaded file, ordered by sort_order. */
export async function fetchPlanners(first = 100): Promise<Planner[]> {
  try {
    const data = await storefrontApiRequest(PLANNERS_QUERY, { type: PLANNER_METAOBJECT_TYPE, first });
    const edges: Array<{ node: PlannerNode }> = data?.data?.metaobjects?.edges ?? [];
    return edges
      .map((e) => mapPlanner(e.node))
      .filter((p) => p.title.length > 0 && p.file_url.length > 0)
      .sort((a, b) => a.sort_order - b.sort_order);
  } catch (error) {
    console.error("Failed to load planners:", error);
    return [];
  }
}

/* --------------------------- Lead capture -------------------------- */

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/**
 * Where the Shopify storefront (primary domain) lives. When this app is served from the
 * Shopify store's own domain, window.location.origin is correct. If the app is served from
 * a different domain, set VITE_SHOPIFY_STORE_URL (e.g. https://focusi.co) to the store's
 * PRIMARY domain, not the *.myshopify.com one (it redirects and drops the POST body).
 */
const STORE_URL: string = (import.meta.env.VITE_SHOPIFY_STORE_URL as string | undefined) ?? (typeof window !== "undefined" ? window.location.origin : "");

/**
 * Records the email as a Shopify customer subscribed to marketing, tagged with
 * "planner-lead" and the planner name. Uses the standard storefront customer form
 * endpoint (POST /contact with form_type=customer), which needs no admin token and
 * is not affected by the Storefront API's deprecated customerCreate mutation.
 *
 * The request is fire-and-forget (no-cors): the browser can't read Shopify's response,
 * so this returns true once the request has been sent.
 */
export async function captureLead(email: string, plannerName: string): Promise<boolean> {
  const trimmed = email.trim();
  if (!EMAIL_RE.test(trimmed) || trimmed.length > 254) return false;

  const tags = ["planner-lead", plannerName.slice(0, 60).replace(/,/g, " ")].join(",");
  const body = new URLSearchParams({
    form_type: "customer",
    utf8: "✓",
    "contact[email]": trimmed,
    "contact[tags]": tags,
  });

  try {
    await fetch(`${STORE_URL}/contact#contact_form`, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    return true;
  } catch (error) {
    console.error("Failed to record lead:", error);
    return false;
  }
}
