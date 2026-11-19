import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sparkles, Download, CalendarDays, Loader2, FileText, ChevronLeft, Target, Sun, ArrowRight, Heart, Star, Moon, Clock, Backpack, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { fetchPlanners, captureLead, type Planner } from "@/lib/shopifyContent";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import PlannerPreviewDialog from "@/components/PlannerPreviewDialog";

const STORAGE_KEY = "focusi_planner_email";

const Divider = () => (
  <div className="flex items-center justify-center gap-4 py-12">
    <div className="h-px w-16 bg-border" />
    <Sparkles className="h-5 w-5 text-primary" strokeWidth={1.5} />
    <div className="h-px w-16 bg-border" />
  </div>
);

const CARD_CONTENT: Record<string, { title: string; text: string; button: string; icon: typeof CalendarDays }> = {
  "Free Planning & Progress Planners": {
    title: "Plan the Week with Confidence",
    text: "Help your child stay organized and feel proud of their progress",
    button: "Get Weekly & Daily Planners",
    icon: CalendarDays,
  },
  "Free Focus & Task Planners": {
    title: "Stay Focused & Finish Tasks",
    text: "Turn tasks into simple steps and help your child stay on track",
    button: "Get Focus Planners",
    icon: Target,
  },
  "Free Daily Routine Planners": {
    title: "Build Calm Daily Routines",
    text: "Make mornings smoother and evenings easier with simple checklists",
    button: "Get Routine Planners",
    icon: Sun,
  },
};

// Icon names that can be set in the planner's optional "icon" field in Shopify.
const PLANNER_ICONS: Record<string, typeof FileText> = {
  moon: Moon,
  backpack: Backpack,
  clock: Clock,
  target: Target,
  sun: Sun,
  calendar: CalendarDays,
  heart: Heart,
  star: Star,
  eye: Eye,
  file: FileText,
};

const getPlannerIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("bed") || lower.includes("night") || lower.includes("evening")) return Moon;
  if (lower.includes("after school")) return Backpack;
  if (lower.includes("before school")) return Backpack;
  if (lower.includes("school")) return Backpack;
  if (lower.includes("morning")) return Clock;
  return FileText;
};

const FreePlanners = () => {
  const [planners, setPlanners] = useState<Planner[]>([]);
  const [loadingPlanners, setLoadingPlanners] = useState(true);
  const [selectedPlanner, setSelectedPlanner] = useState<Planner | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [previewPlanner, setPreviewPlanner] = useState<Planner | null>(null);

  const handleSetActiveGroup = (group: string | null) => {
    setActiveGroup(group);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setSavedEmail(stored);
  }, []);

  useEffect(() => {
    fetchPlanners()
      .then(setPlanners)
      .finally(() => setLoadingPlanners(false));
  }, []);

  const groupedPlanners = planners.reduce<Record<string, Planner[]>>((acc, p) => {
    const group = p.group_name || "Other";
    if (!acc[group]) acc[group] = [];
    acc[group].push(p);
    return acc;
  }, {});

  const sortedGroups = Object.keys(groupedPlanners).sort(
    (a, b) => Math.min(...groupedPlanners[a].map((p) => p.sort_order)) - Math.min(...groupedPlanners[b].map((p) => p.sort_order)),
  );

  const triggerDownload = async (planner: Planner, userEmail: string) => {
    await captureLead(userEmail, planner.title);

    toast.success("Your download is starting!");

    if (planner.file_url) {
      try {
        const response = await fetch(planner.file_url);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${planner.title}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch {
        window.open(planner.file_url, "_blank");
      }
    }
  };

  const handleDownloadClick = async (planner: Planner) => {
    if (savedEmail) {
      await triggerDownload(planner, savedEmail);
    } else {
      setSelectedPlanner(planner);
      setEmail("");
      setDialogOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !selectedPlanner) return;

    setSubmitting(true);
    const trimmedEmail = email.trim();

    localStorage.setItem(STORAGE_KEY, trimmedEmail);
    setSavedEmail(trimmedEmail);

    await triggerDownload(selectedPlanner, trimmedEmail);

    setSubmitting(false);
    setDialogOpen(false);
    setEmail("");
    setSelectedPlanner(null);
  };

  const handleChangeEmail = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedEmail(null);
    toast.info("Email cleared. You'll be asked for it on your next download.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Free Planners"
        description="Download free printable planners designed to help children with ADHD stay organized, build routines, and track progress."
        path="/free-planners"
      />
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        {/* Hero */}
        <section className="relative flex items-center justify-center min-h-[45vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/15 to-primary/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--accent)/0.15),transparent_60%)]" />
          <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full border border-primary/10 opacity-40" />
          <div className="absolute bottom-16 left-[10%] w-40 h-40 rounded-full border border-primary/10 opacity-30" />
          <div className="relative z-10 container px-4 text-center max-w-3xl mx-auto animate-fade-in-up">
            {activeGroup ? (
              <>
                <button
                  onClick={() => handleSetActiveGroup(null)}
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                  <ChevronLeft className="h-4 w-4" /> Back to all planners
                </button>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-[1.1]">
                  {CARD_CONTENT[activeGroup]?.title || activeGroup}
                </h1>
                {groupedPlanners[activeGroup]?.[0]?.group_description && (
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-6 max-w-2xl mx-auto">{groupedPlanners[activeGroup][0].group_description}</p>
                )}
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full px-4 py-1.5 mb-4">
                  <Sparkles className="h-3.5 w-3.5" /> 100% Free — No credit card needed
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mt-2">
                  Free <span className="text-primary">Planners</span>
                </h1>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-8 max-w-2xl mx-auto">
                  Download our free planners designed to help children build better routines, stay focused, and thrive every day.
                </p>
                <div className="flex items-center justify-center gap-3 mt-6">
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Heart className="h-3.5 w-3.5 text-orange-400" fill="currentColor" /> Loved by parents
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Star className="h-3.5 w-3.5 text-orange-400" /> Educator-approved
                  </span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Planner Groups */}
        <section className="relative py-4 animate-fade-in-up">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/15 to-primary/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--accent)/0.15),transparent_60%)]" />
          <div className="relative z-10 container px-4 max-w-5xl mx-auto">
            {loadingPlanners ? (
              <div className="flex justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : sortedGroups.length === 0 ? (
              <p className="text-muted-foreground text-center py-16">New planners are coming soon! Check back later.</p>
            ) : activeGroup ? (
              /* File list view */
              <div>
                <div className="space-y-3">
                  {groupedPlanners[activeGroup]?.map((planner) => (
                    <div key={planner.id} className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background/60 px-5 py-4">
                      <div className="flex items-center gap-3 min-w-0">
                        {(() => {
                          const Icon = PLANNER_ICONS[planner.icon] ?? (activeGroup === "Free Focus & Task Planners" ? Target : getPlannerIcon(planner.title));
                          return <Icon className="h-7 w-7 text-orange-500 shrink-0" strokeWidth={1.5} />;
                        })()}
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-base">{planner.title}</p>
                          {planner.description && <p className="text-muted-foreground text-sm">{planner.description}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button size="sm" variant="outline" onClick={() => setPreviewPlanner(planner)}>
                          <Eye className="h-4 w-4 mr-1.5" />
                          Preview
                        </Button>
                        <Button size="sm" onClick={() => handleDownloadClick(planner)}>
                          <Download className="h-4 w-4 mr-1.5" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Category cards grid */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sortedGroups.map((groupName) => {
                  const content = CARD_CONTENT[groupName];
                  const groupIconName = groupedPlanners[groupName].map((p) => p.group_icon).find(Boolean) ?? "";
                  const IconComponent = PLANNER_ICONS[groupIconName] ?? content?.icon ?? FileText;
                  return (
                    <button
                      key={groupName}
                      onClick={() => handleSetActiveGroup(groupName)}
                      className="group flex flex-col items-center text-center rounded-3xl border border-border/40 bg-background shadow-sm p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/25 h-full"
                    >
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/15 transition-colors">
                        <IconComponent className="h-7 w-7 text-primary" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground tracking-tight leading-snug group-hover:text-primary transition-colors">
                        {content?.title || groupName}
                      </h3>
                      <p className="text-muted-foreground text-[15px] leading-relaxed mt-3 flex-1 max-w-[240px]">
                        {content?.text || `${groupedPlanners[groupName].length} files available`}
                      </p>
                      <div className="mt-auto pt-7 w-full">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground bg-primary rounded-full px-6 py-2.5 group-hover:bg-primary/85 group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300">
                          {content?.button || "Free Download"} <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <Divider />

        {/* Closing */}
        <section className="container px-4 text-center max-w-2xl mx-auto animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">More Resources Coming Soon</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base leading-relaxed mt-6">
            We're always creating new tools and resources to help kids stay focused, organized, and engaged. Stay tuned for more free downloads.
          </p>
        </section>
      </main>
      <Footer />

      {/* Email Capture Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get Your Free Planners</DialogTitle>
            <DialogDescription>Enter your email once to unlock instant access to all planners — no need to re-enter it again.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Download Now"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {/* PDF Preview Dialog */}
      {previewPlanner && (
        <PlannerPreviewDialog
          open={!!previewPlanner}
          onOpenChange={(open) => !open && setPreviewPlanner(null)}
          title={previewPlanner.title}
          fileUrl={previewPlanner.file_url}
          onDownload={() => {
            setPreviewPlanner(null);
            handleDownloadClick(previewPlanner);
          }}
        />
      )}
    </div>
  );
};

export default FreePlanners;
