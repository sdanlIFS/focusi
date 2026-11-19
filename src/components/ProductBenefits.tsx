import { Shield, Sparkles } from "lucide-react";
import benefitIcon from "@/assets/benefit-icon.webp";
import sensoryIcon from "@/assets/sensory-benefit.webp";
import strengthIcon from "@/assets/strength-benefit.webp";

interface BenefitBlock {
  label: string;
  heading: string;
  description: string;
  image?: string;
}

const benefits: BenefitBlock[] = [
{
  label: "Focus",
  heading: "Stay Focused While Learning",
  description:
  "Gentle movement helps channel restless energy, allowing kids to concentrate better during homework, reading, and classroom activities."
},
{
  label: "Sensory",
  heading: "Regulates Sensory Needs",
  description:
  "Provides calming vestibular input that helps children with sensory processing needs feel grounded and regulated throughout the day.",
  image: sensoryIcon
},
{
  label: "Strength",
  heading: "Healthy Sitting & Core Strength",
  description:
  "Encourages active sitting that strengthens core muscles, improves balance, and promotes better posture — all while seated.",
  image: strengthIcon
},
{
  label: "Movement",
  heading: "Move While Staying Seated",
  description:
  "Lets kids bounce, rock, and wiggle without leaving their seat — satisfying their natural need to move without disrupting others."
},
{
  label: "Productivity",
  heading: "Stay On Task & Manage Time",
  description:
  "By reducing fidgeting and restlessness, children can stay engaged longer, complete tasks more efficiently, and build better study habits."
}];


const ImageFrame = ({ customImage }: { customImage?: string }) =>
<div className="relative flex items-center justify-center w-full aspect-square max-w-[320px] mx-auto">
    {/* Outer decorative ring */}
    <div className="absolute inset-4 rounded-3xl border border-primary/20 rotate-3" />
    {/* Main frame */}
    <div className="relative w-4/5 aspect-square rounded-2xl bg-gradient-to-br from-primary/10 via-accent/30 to-primary/5 border border-primary/15 flex items-center justify-center shadow-lg overflow-hidden">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-background/20" />
      <img src={customImage || benefitIcon} alt="FOCUSI wobble stool" className="w-[90%] h-[90%] object-contain relative z-10" />
    </div>
  </div>;


const ProductBenefits = () => {
  return (
    <section aria-labelledby="product-benefits-heading" className="container px-4 mt-20 mb-16 space-y-20">
      <h2 id="product-benefits-heading" className="sr-only">Product benefits</h2>
      {/* Guarantee Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 p-8 md:p-12 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            1-Year FOCUSI™ Guarantee
          </h3>
          <p className="text-muted-foreground max-w-lg text-sm md:text-base leading-relaxed">
            We stand behind every product. If you're not completely satisfied, we'll make it right — no questions asked.
          </p>
        </div>
      </div>

      {/* Benefit Blocks — alternating layout */}
      {benefits.map((benefit, index) => {
        const isReversed = index % 2 !== 0;
        return (
          <div
            key={benefit.heading}
            className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${
            isReversed ? "md:direction-rtl" : ""}`
            }>

            {/* Icon Panel */}
            <div className={`${isReversed ? "md:order-2" : "md:order-1"}`}>
              <ImageFrame customImage={benefit.image} />
            </div>

            {/* Text Panel */}
            <div className={`space-y-4 ${isReversed ? "md:order-1 md:text-right" : "md:order-2 text-left"}`}>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                {benefit.label}
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight">
                {benefit.heading}
              </h3>
              <p className={`text-muted-foreground text-sm md:text-base leading-relaxed max-w-md ${isReversed ? "md:ml-auto" : ""}`}>
                {benefit.description}
              </p>
            </div>
          </div>);

      })}

      {/* Closing Statement */}
      <div className="text-center space-y-6 pt-8">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-border" />
          <Sparkles className="h-6 w-6 text-primary" strokeWidth={1.5} />
          <div className="h-px w-16 bg-border" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          The Perfect Combination
        </h3>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          Movement, focus, and comfort — designed to help every child thrive at home and in the classroom.
        </p>
      </div>
    </section>);

};

export default ProductBenefits;