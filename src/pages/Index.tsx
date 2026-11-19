import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { fetchBlogPosts } from "@/lib/shopifyContent";
import { Loader2, Shield, Sparkles, Leaf, Award, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import reviewMaryam from "@/assets/review-maryam.jpg";
import reviewDavid from "@/assets/review-david.jpg";
import reviewLisa from "@/assets/review-lisa.jpg";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<
    { id: string; title: string; slug: string; excerpt: string; cover_image: string; created_at: string }[]
  >([]);

  useEffect(() => {
    fetchProducts(20)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));

    fetchBlogPosts(3).then(setBlogPosts);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Shared green gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/15 to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--accent)/0.15),transparent_60%)]" />
      <div className="relative z-10">
        <SEO
          title="Focusi — Active Seating & Tools for Focus"
          description="Shop Focusi wobble stools and visual timers — active seating and focus tools designed for kids with ADHD, autism, and sensory needs."
          path="/shop"
          jsonLd={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Focusi",
              url: "https://focusi.co",
              logo: "https://focusi.co/src/assets/logo.avif",
              sameAs: ["https://focusi.co"],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Focusi",
              url: "https://focusi.co",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://focusi.co/blog?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
          ]}
        />
        <Navbar />

        {/* Video Hero */}
        <section className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0">
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
              src="/videos/hero-compressed.mp4"
              poster="/videos/hero-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 container h-full flex flex-col justify-end pb-16 md:pb-24">
            <div className="max-w-xl animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl text-white leading-[1.1] mb-4 font-bold">
                Focusi — Active Seating &amp; Tools for <span className="text-primary">Focused Kids</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 animate-fade-in-up delay-1">
                Movement-friendly stools designed to help kids stay engaged, comfortable, and ready to learn.
              </p>
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-md bg-white text-black font-semibold px-8 py-3 hover:bg-white/90 transition-colors animate-fade-in-up delay-2"
              >
                Shop Now
              </a>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t border-border/50">
          <div className="container py-24 md:py-32">
            <p className="text-xs tracking-[0.3em] uppercase text-primary text-center mb-4 animate-fade-in-up">
              Why Focusi
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-20 animate-fade-in-up delay-1">
              Designed for Focus. Built to Last.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-10">
              {[
                {
                  icon: Shield,
                  title: "Ergonomic Movement for Healthier Posture",
                  description: "Supports natural movement for better posture and comfort",
                },
                {
                  icon: Sparkles,
                  title: "Active Seating for Enhanced Focus",
                  description: "Keeps kids engaged and helps them focus longer",
                },
                {
                  icon: Leaf,
                  title: "Versatile Design for Any Space",
                  description: "Perfect for home, classrooms, or study corners",
                },
                {
                  icon: Award,
                  title: "Durable, Stylish, and Comfortable",
                  description: "Strong, comfortable, and designed to last",
                },
              ].map(({ icon: Icon, title, description }, i) => (
                <div key={title} className={`flex flex-col items-center text-center animate-fade-in-up delay-${i + 1}`}>
                  <Icon className="h-8 w-8 text-primary mb-6" strokeWidth={1} />
                  <div className="w-8 h-px bg-foreground/20 mb-6" />
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground mb-3">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-[240px]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="container py-16 md:py-24 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No products found</p>
            </div>
          ) : (
            <div className="flex flex-col gap-16">
              {products.map((product, index) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Reviews */}
        <section className="border-t border-border/50">
          <div className="container py-24 md:py-32">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground text-center mb-4 animate-fade-in-up">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-20 animate-fade-in-up delay-1">
              What Parents Are Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Maryam A.",
                  initials: "MA",
                  image: reviewMaryam,
                  title: "The wobble stool changed homework time",
                  body: "My son has ADHD and the Focusi wobble stool has been a game changer. He can wiggle without leaving his seat and actually stays focused. Highly recommend for any parent dealing with focus challenges.",
                },
                {
                  name: "David R.",
                  initials: "DR",
                  image: reviewDavid,
                  title: "Timer + stool = focus combo",
                  body: "We bought both the wobble stool and the visual timer. My daughter flips the timer cube to 25 minutes, sits on the stool, and gets her reading done without a single reminder. The combo works like magic.",
                },
                {
                  name: "Sarah T.",
                  initials: "ST",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                  title: "This little timer cube is genius",
                  body: "No buttons, no setup — my 6-year-old just flips it and starts his task. The visual countdown helps him understand how long 10 minutes actually is. We use it for homework, chores, and screen time limits.",
                },
                {
                  name: "James L.",
                  initials: "JL",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                  title: "Perfect for our classroom",
                  body: "I'm a teacher and ordered 6 wobble stools for students who struggle with sitting still. The difference in their attention span is noticeable. I also use the timer cube for transitions — parents have been asking where I got them!",
                },
                {
                  name: "Emily K.",
                  initials: "EK",
                  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
                  title: "The timer helped build a routine",
                  body: "My daughter struggles with transitions and the visual timer cube made a huge difference. She can see exactly how much time is left, so there are no more meltdowns when it's time to switch activities. Simple but so effective.",
                },
                {
                  name: "Lisa M.",
                  initials: "LM",
                  image: reviewLisa,
                  title: "Stool improved her posture too",
                  body: "Not only does my daughter focus better on the wobble stool, but I've noticed she sits up straighter. The ergonomic design really works. We're planning to get the visual timer next to complete the setup.",
                },
              ].map((review, i) => (
                <div
                  key={review.name}
                  className={`rounded-xl border border-border bg-card p-6 flex flex-col gap-4 animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={review.image} alt={review.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                        {review.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{review.name}</p>
                      <div className="flex gap-0.5 mt-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{review.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{review.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Preview */}
        {blogPosts.length > 0 && (
          <section className="border-t border-border/50">
            <div className="container py-24 md:py-32">
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground text-center mb-4 animate-fade-in-up">
                Parents Power Tools
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-16 animate-fade-in-up delay-1">
                Latest from the Blog
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, i) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className={`group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow animate-fade-in-up delay-${i + 2}`}
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
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      <span className="inline-block mt-4 text-sm font-medium text-primary">Read more →</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  to="/blog"
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold px-8 py-3 hover:bg-primary/90 transition-colors"
                >
                  View All Articles
                </Link>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Index;
