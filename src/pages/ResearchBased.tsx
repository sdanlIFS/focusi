import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sparkles, Brain, Shield, Activity, BookOpen, Home, GraduationCap, HeartPulse, Ruler, CircleDot, Feather, Dumbbell } from "lucide-react";
import SEO from "@/components/SEO";

const Divider = () => (
  <div className="flex items-center justify-center gap-4 py-12">
    <div className="h-px w-16 bg-border" />
    <Sparkles className="h-5 w-5 text-primary" strokeWidth={1.5} />
    <div className="h-px w-16 bg-border" />
  </div>
);

const ResearchBased = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="Research-Based" description="Discover the science behind wobble stools and how movement helps children with ADHD improve focus, posture, and self-regulation." path="/research-based" />
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        {/* Hero */}
        <section className="relative flex items-center justify-center min-h-[80vh] overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/15 to-primary/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--accent)/0.15),transparent_60%)]" />
          {/* Decorative circles */}
          <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full border border-primary/10 opacity-40" />
          <div className="absolute bottom-16 left-[10%] w-40 h-40 rounded-full border border-primary/10 opacity-30" />
          <div className="relative z-10 container px-4 text-center max-w-3xl mx-auto animate-fade-in-up">
            <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-primary bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-8">
              Research Based
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mt-2">
              The Effectiveness of Wobble Stools for{" "}
              <span className="text-primary">ADHD Children</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-8 max-w-2xl mx-auto">
              Managing ADHD in children often requires creative and evidence-based solutions to help them focus, stay engaged, and release excess energy. Wobble stools have emerged as a powerful tool in this context, blending ergonomic innovation with developmental science.
            </p>
          </div>
        </section>

        <Divider />

        {/* What Are Wobble Stools */}
        <section className="container px-4 max-w-3xl mx-auto text-center animate-fade-in-up">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
            Overview
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mt-4">
            What Are Wobble Stools?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-6 max-w-2xl mx-auto">
            Wobble stools are ergonomic seating options designed with a rounded, slightly unstable base. This allows users to move, tilt, and rock gently while seated. Unlike traditional chairs, wobble stools encourage active sitting, which engages the body and mind simultaneously.
          </p>
        </section>

        <Divider />

        {/* The Science Behind Movement and Focus */}
        <section className="container px-4 max-w-4xl mx-auto animate-fade-in-up">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              The Science
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mt-4">
              Movement and Focus
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
              Studies show that movement can significantly improve attention and cognitive performance in children with ADHD.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                label: "Dopamine",
                heading: "Increased Dopamine Release",
                description: "Physical activity, even subtle movement, boosts dopamine levels, which are often deficient in children with ADHD. Dopamine plays a crucial role in focus and motivation.",
              },
              {
                icon: Activity,
                label: "Sensory",
                heading: "Sensory Regulation",
                description: "The rocking and tilting motions of wobble stools provide sensory input that can help children self-regulate and feel grounded.",
              },
              {
                icon: Dumbbell,
                label: "Strength",
                heading: "Improved Core Strength & Posture",
                description: "The need to balance on a wobble stool activates core muscles, improving posture and reducing discomfort that can distract children.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 p-8 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                  <item.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary block">
                  {item.label}
                </span>
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  {item.heading}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Research Supporting Wobble Stools */}
        <section className="container px-4 max-w-3xl mx-auto animate-fade-in-up">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Evidence
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mt-4">
              Research Supporting Wobble Stools
            </h2>
          </div>
          <div className="space-y-8">
            {[
              {
                icon: BookOpen,
                title: "Movement Enhances Learning",
                source: "Child Neuropsychology, 2016",
                description: "Children with ADHD perform better on tasks requiring focus when they are allowed to move.",
              },
              {
                icon: BookOpen,
                title: "Active Seating Benefits",
                source: "Journal of Occupational Therapy",
                description: "Active seating, like wobble stools, improves engagement in classroom settings for children with sensory and attention challenges.",
              },
              {
                icon: BookOpen,
                title: "Behavioral Improvements",
                source: "Psychology in the Schools",
                description: "Alternative seating, including wobble stools, reduced disruptive behaviors in children with ADHD.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-foreground tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-primary/70 italic">{item.source}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Key Benefits — alternating layout */}
        <section className="container px-4 max-w-4xl mx-auto space-y-16 animate-fade-in-up">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Benefits
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mt-4">
              Key Benefits for ADHD Children
            </h2>
          </div>
          {[
            {
              icon: Activity,
              label: "Active",
              heading: "Promotes Active Sitting",
              description: "Keeps children moving without disrupting others, allowing them to channel energy productively.",
            },
            {
              icon: Brain,
              label: "Focus",
              heading: "Enhances Focus",
              description: "Gentle movement helps maintain attention during activities like reading, homework, or classroom tasks.",
            },
            {
              icon: Shield,
              label: "Posture",
              heading: "Encourages Better Posture",
              description: "Reduces slouching and associated discomfort, which can be a distraction.",
            },
            {
              icon: Dumbbell,
              label: "Durability",
              heading: "Durable and Safe",
              description: "Designed to handle active use, ensuring stability and long-term benefits.",
            },
          ].map((benefit, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={benefit.heading}
                className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center`}
              >
                <div className={`${isReversed ? "md:order-2" : "md:order-1"} flex justify-center`}>
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/20 to-primary/5 border border-primary/15 flex items-center justify-center shadow-lg">
                    <benefit.icon className="h-12 w-12 text-primary" strokeWidth={1.5} />
                  </div>
                </div>
                <div className={`space-y-4 ${isReversed ? "md:order-1 md:text-right" : "md:order-2 text-left"}`}>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                    {benefit.label}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
                    {benefit.heading}
                  </h3>
                  <p className={`text-muted-foreground text-sm md:text-base leading-relaxed max-w-md ${isReversed ? "md:ml-auto" : ""}`}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        <Divider />

        {/* Wobble Stools in Practice */}
        <section className="container px-4 max-w-4xl mx-auto animate-fade-in-up">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              In Practice
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mt-4">
              Wobble Stools in Practice
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
              Parents, educators, and therapists have found innovative ways to incorporate wobble stools into daily life.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                label: "At Home",
                description: "Use wobble stools during meals, homework, or creative activities to encourage focus and engagement.",
              },
              {
                icon: GraduationCap,
                label: "In the Classroom",
                description: "Teachers report that wobble stools help ADHD students stay on task without requiring additional intervention.",
              },
              {
                icon: HeartPulse,
                label: "In Therapy Sessions",
                description: "Occupational therapists often use wobble stools to support sensory integration therapy.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 p-8 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                  <item.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  {item.label}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Choosing the Right Wobble Stool */}
        <section className="container px-4 max-w-3xl mx-auto animate-fade-in-up">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Guide
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mt-4">
              Choosing the Right Wobble Stool
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Ruler, title: "Height Adjustability", description: "Ensures the stool grows with your child and fits various desks or tables." },
              { icon: CircleDot, title: "Non-Slip Base", description: "Provides safety and stability during movement." },
              { icon: Feather, title: "Lightweight Design", description: "Easy to move and store when not in use." },
              { icon: Shield, title: "Durability", description: "Made from high-quality materials to withstand daily use." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start p-4 rounded-xl border border-border bg-card">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Closing */}
        <section className="container px-4 text-center max-w-2xl mx-auto animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Remember This...
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base leading-relaxed mt-6">
            Wobble stools are more than just a seating option — they're a tool for helping ADHD children thrive. Backed by research and real-world applications, these stools can enhance focus, improve posture, and provide a productive outlet for energy. By integrating wobble stools into your child's environment, you're supporting their developmental journey and empowering them to succeed.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchBased;
