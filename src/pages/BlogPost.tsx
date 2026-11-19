import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { fetchBlogPostBySlug, type BlogPost as Post } from "@/lib/shopifyContent";
import { Loader2, ArrowLeft, Download } from "lucide-react";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { useRef, useCallback } from "react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchBlogPostBySlug(slug)
      .then(setPost)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center pt-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
          <Link to="/blog" className="text-primary underline">Back to blog</Link>
        </div>
      </div>
    );
  }

  const plainText = (post.content || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const seoDescription = (() => {
    const snippet = plainText.slice(0, 200).trim();
    if (snippet.length >= 50) return snippet;
    const fallback = `${post.title} — read the latest from Focusi on focus, sensory needs, and helping kids thrive at home and in the classroom.`;
    return fallback.slice(0, 200);
  })();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.cover_image ? [post.cover_image] : undefined,
    datePublished: post.created_at,
    author: { "@type": "Person", name: post.author_name || "Focusi" },
    publisher: { "@type": "Organization", name: "Focusi", logo: { "@type": "ImageObject", url: "https://focusi.co/src/assets/logo.avif" } },
    mainEntityOfPage: `https://focusi.co/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={post.title}
        description={seoDescription}
        path={`/blog/${post.slug}`}
        image={post.cover_image || undefined}
        type="article"
        jsonLd={articleJsonLd}
      />
      <Navbar />
      <article className="container pt-28 pb-16 max-w-3xl mx-auto animate-fade-in-up">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>

        {post.cover_image && (
          <div className="rounded-xl overflow-hidden mb-8 animate-fade-in-up delay-1">
            <img src={post.cover_image} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-2">
          {post.author_name} ·{" "}
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{post.title}</h1>

        <BlogContent content={post.content} />
      </article>
      <Footer />
    </div>
  );
};

const BlogContent = ({ content }: { content: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async (src: string) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = src.split("/").pop() || "image";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(src, "_blank");
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images = container.querySelectorAll("img");
    images.forEach((img) => {
      if (img.parentElement?.querySelector(".download-btn")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "relative inline-block";
      img.parentElement?.insertBefore(wrapper, img);
      wrapper.appendChild(img);

      const btn = document.createElement("button");
      btn.className =
        "download-btn flex items-center gap-1.5 mt-2 px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer";
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg> Download Image`;
      btn.addEventListener("click", () => handleDownload(img.src));
      wrapper.appendChild(btn);
    });
  }, [content, handleDownload]);

  return (
    <div
      ref={containerRef}
      className="prose prose-neutral max-w-none text-foreground
        prose-headings:font-semibold prose-headings:text-foreground
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-primary prose-strong:text-foreground
        prose-li:text-muted-foreground animate-fade-in-up delay-2"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BlogPost;
