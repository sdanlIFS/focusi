import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, Star, Check } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

const COLOR_MAP: Record<string, string> = {
  "sky blue": "#5B9BD5",
  "nature green": "#7CB342",
  "sunny orange": "#E65100",
  "ocean blue": "#1B3A5C",
  "lake teal": "#3B6D7A",
  "rose clay": "#A86B6B",
  black: "#1a1a1a",
  blue: "#5B9BD5",
  sky: "#5B9BD5",
  ocean: "#1B3A5C",
  green: "#7CB342",
  nature: "#7CB342",
  grey: "#8C8C8C",
  gray: "#8C8C8C",
  pink: "#E8839B",
  rose: "#A86B6B",
  red: "#D94A4A",
  white: "#F5F5F5",
  purple: "#7B5EA7",
  orange: "#E65100",
  sunny: "#E65100",
  yellow: "#E8D44D",
  beige: "#D9C9A5",
  clay: "#A86B6B",
  navy: "#1B3A5C",
  teal: "#3B6D7A",
  lake: "#3B6D7A"
};

function getColorHex(colorName: string): string {
  const lower = colorName.toLowerCase().trim();

  // Full name match first (e.g. "sky blue", "ocean blue")
  if (COLOR_MAP[lower]) return COLOR_MAP[lower];

  // Direct single-word match
  const words = lower.split(/\s+/);
  for (const word of words) {
    if (COLOR_MAP[word]) return COLOR_MAP[word];
  }
  const parts = lower.split(/[^a-z]+/).filter(Boolean);
  for (const part of parts) {
    if (COLOR_MAP[part]) return COLOR_MAP[part];
  }

  // Deterministic fallback color if an unknown name appears
  const hue = Array.from(lower).reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 360;
  return `hsl(${hue} 55% 62%)`;
}

interface ProductCardProps {
  product: ShopifyProduct;
  reverse?: boolean;
}

export const ProductCard = ({ product, reverse = false }: ProductCardProps) => {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants.edges[0]?.node;
  const formattedPrice = parseFloat(price.amount).toFixed(2);

  // Extract color options
  const colorOption = node.options?.find(
    (opt) => opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour"
  );
  const colors = colorOption?.values ?? [];

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });
    toast.success(`${node.title} added to cart`);
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="relative">
        {/* Outer decorative ring */}
        <div className="absolute inset-2 rounded-3xl border border-primary/20 rotate-2" />
        {/* Inner decorative ring */}
        <div className="absolute inset-0 rounded-3xl border border-primary/10 -rotate-1" />
        <div className={`relative flex-col gap-8 md:gap-12 bg-primary-foreground items-center justify-start p-8 md:p-12 flex rounded-2xl ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
          {/* Image */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden">
              {image ?
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="h-full w-full object-scale-down"
                loading="lazy" /> :
              <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
              }
            </div>
            {/* Color swatches */}
            {colors.length > 1 &&
            <div className="mt-10 flex -translate-x-3 flex-col items-center gap-4 md:-translate-x-4">
                <span className="text-base font-semibold text-foreground">Available Colors</span>
                <div className="flex items-center justify-center gap-3">
                {colors.map((color) => {
                  const hex = getColorHex(color);
                  return (
                    <button
                      key={color}
                      type="button"
                      title={color}
                      aria-label={`Choose ${color} color`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/product/${node.handle}?color=${encodeURIComponent(color)}`);
                      }}
                      className="inline-block w-7 h-7 md:w-9 md:h-9 rounded-full border-2 border-border shadow-md hover:scale-110 hover:border-primary transition-all cursor-pointer"
                      style={{ backgroundColor: hex }} />);


                })}
                </div>
              </div>
            }
          </div>

        {/* Content */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3">
            {node.title}
          </h3>

          {/* Star rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) =>
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                )}
            </div>
            <span className="text-sm text-muted-foreground">Happy Parents</span>
          </div>

          {(() => {
              const bullets = node.description
                .split(/(?=Helps Kids Stay Focused|Flip to Start|Pomodoro Timer Cube|Visual Timer for Classroom|Customizable Kids Visual Timer|Active Sitting|Height Adjustable|360° Swivel|Comfortable Seat|Durable Build)/g)
                .map((s) => s.trim())
                .filter(Boolean);

              if (bullets.length > 1) {
                return (
                  <ul className="mb-6 space-y-3">
                  {bullets.map((bullet, i) => {
                      const periodIndex = bullet.indexOf('. ');
                      const colonIndex = bullet.indexOf(':');
                      const sepIndex = colonIndex > 0 && colonIndex < 80 ? colonIndex : (periodIndex > 0 && periodIndex < 80 ? periodIndex : -1);
                      const sepLen = sepIndex === colonIndex ? 1 : 2;
                      if (sepIndex > 0) {
                        return (
                          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                          <span>
                            <span className="font-bold text-foreground">{bullet.slice(0, sepIndex)}.</span>{' '}
                            <span className="text-muted-foreground">{bullet.slice(sepIndex + sepLen)}</span>
                          </span>
                        </li>);
                      }
                      return (
                        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                        <span>{bullet}</span>
                      </li>);
                    })}
                </ul>);
              }
              return <p className="text-muted-foreground leading-relaxed mb-6">{node.description}</p>;
            })()}

          <Button
              onClick={handleAddToCart}
              disabled={isLoading || !firstVariant?.availableForSale}
              className="w-full rounded-full py-6 text-base font-semibold gap-2"
              size="lg">

            {isLoading ?
              <Loader2 className="h-5 w-5 animate-spin" /> :

              <ShoppingCart className="h-5 w-5" />
              }
            Add To Cart — ${formattedPrice}
          </Button>
        </div>
      </div>
      </div>
    </Link>);

};