import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sparkles, Heart, Target, Users } from "lucide-react";
import SEO from "@/components/SEO";


const Divider = () => (
  <div className="flex items-center justify-center gap-4 py-12">
    <div className="h-px w-16 bg-border" />
    <Sparkles className="h-5 w-5 text-primary" strokeWidth={1.5} />
    <div className="h-px w-16 bg-border" />
  </div>
);

const WhyFocusi = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="Why Focusi" description="Learn why Focusi wobble stools are designed by parents of children with ADHD to support focus, movement, and learning." path="/why-focusi" />
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
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mt-2">
              Why <span className="text-primary">FOCUSI</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-8 max-w-2xl mx-auto animate-fade-in-up delay-1">
              At FOCUSI, we understand that every child learns differently, especially those with ADHD, sensory challenges, or high energy levels.
            </p>
          </div>
        </section>

        <Divider />

        {/* Our Approach */}
        <section className="container px-4 max-w-3xl mx-auto text-center animate-fade-in-up">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
            Our Approach
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mt-4">
            Designed for Every Learner
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-6 max-w-2xl mx-auto">
            Traditional learning environments often miss the mark for these kids, leading to frustration. That's why we've created products that turn learning into an active, engaging experience.
          </p>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
            Our wobble stool and visual timer help your child stay focused, motivated, and ready to succeed, wherever they learn. With FOCUSI, you're investing in your child's success and well-being.
          </p>
        </section>

        <Divider />

        {/* Who Are We */}
        <section className="container px-4 max-w-4xl mx-auto animate-fade-in-up">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/20 to-primary/5 border border-primary/15 flex items-center justify-center shadow-lg">
                <Users className="h-12 w-12 text-primary" strokeWidth={1.5} />
              </div>
            </div>
            <div className="space-y-4 text-left">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                Who We Are
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
                Parents Who Understand
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
                We're parents who have firsthand experience raising children with ADHD. Inspired by our own child's needs, we developed products that help kids channel their energy into positive outcomes at school and beyond.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
                Our journey began with a simple goal: to create tools that make learning more engaging and enjoyable. Today, we're committed to providing solutions that benefit all children—whether they have ADHD, high energy levels, or just need extra support to stay focused.
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* Mission */}
        <section className="container px-4 max-w-4xl mx-auto animate-fade-in-up">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-4 text-left md:text-right md:order-1">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                Our Mission
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
                Transforming How Children Learn
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md md:ml-auto">
                Our mission is to transform how children learn by offering products that blend movement and focus, helping all children—whether they have ADHD, high energy, or need extra support—stay engaged, motivated, and successful in any learning environment.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md md:ml-auto">
                We're here to support families and educators with tools that create a positive, dynamic learning experience.
              </p>
            </div>
            <div className="flex justify-center md:order-2">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/20 to-primary/5 border border-primary/15 flex items-center justify-center shadow-lg">
                <Target className="h-12 w-12 text-primary" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Closing */}
        <section className="container px-4 text-center max-w-2xl mx-auto animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
            <Heart className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Your Partner in Growth
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base leading-relaxed mt-6">
            By choosing FOCUSI, you're choosing a partner committed to helping your child reach their full potential.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WhyFocusi;
