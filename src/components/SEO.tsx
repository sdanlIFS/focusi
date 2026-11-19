import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = "https://focusi.co";
const DEFAULT_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4e770cd7-5024-4174-a141-aa9099d57d63/id-preview-ed28c78f--54e4433b-ade3-452d-97f8-94752a984db0.lovable.app-1772616234027.png";

const SEO = ({ title, description, path = "/", image, type = "website", jsonLd }: SEOProps) => {
  const fullTitle = title === "Focusi" || title.startsWith("Focusi ") || title.startsWith("Focusi —") ? title : `${title} | Focusi`;
  const url = `${BASE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", type);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:card", "summary_large_image");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Manage page-scoped JSON-LD
    const existing = document.querySelectorAll('script[data-seo-jsonld="true"]');
    existing.forEach((n) => n.remove());
    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      blocks.forEach((block) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "true");
        script.text = JSON.stringify(block);
        document.head.appendChild(script);
      });
    }
  }, [fullTitle, description, url, ogImage, type, jsonLd]);

  return null;
};

export default SEO;
