import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { fetchBlogPosts, type BlogPost } from "@/lib/shopifyContent";
import { Loader2, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";

const Divider = () => (
  <div className="flex items-center justify-center gap-4 py-12">
    <div className="h-px w-16 bg-border" />
    <Sparkles className="h-5 w-5 text-primary" strokeWidth={1.5} />
    <div className="h-px w-16 bg-border" />
  </div>
);

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="Blog" description="Tips, research, and stories about helping children with ADHD thrive through movement and sensory support." path="/blog" />
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        {/* Hero */}
        <section className="relative flex items-center justify-center min-h-[80vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/15 to-primary/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--accent)/0.15),transparent_60%)]" />
          <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full border border-primary/10 opacity-40" />
          <div className="absolute bottom-16 left-[10%] w-40 h-40 rounded-full border border-primary/10 opacity-30" />
          <div className="relative z-10 container px-4 text-center max-w-3xl mx-auto animate-fade-in-up">
            <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-primary bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-8">
              Parents Power Tools
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mt-2">
              Our <span className="text-primary">Blog</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-8 max-w-2xl mx-auto animate-fade-in-up delay-1">
              Insights, tips, and resources to help parents empower their children's learning journey.
            </p>
          </div>
        </section>

        <Divider />

        <div className="container px-4 animate-fade-in-up">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg py-20">No articles yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className={`group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
              >
                {post.cover_image && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <span className="inline-block mt-4 text-sm font-medium text-primary">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
