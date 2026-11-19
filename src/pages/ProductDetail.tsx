import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { ArrowLeft, Loader2, ShoppingCart, Check, Puzzle, Eye, Heart, Users, Feather, Clock } from "lucide-react";
import ProductBenefits from "@/components/ProductBenefits";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [overrideImageUrl, setOverrideImageUrl] = useState<string | null>(null);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    fetchProductByHandle(handle)
      .then((p) => {
        setProduct(p);
        setSelectedImage(0);
        setOverrideImageUrl(null);

        // Pre-select color from query param
        const colorParam = searchParams.get('color');
        if (colorParam && p) {
          const matchIdx = p.variants.edges.findIndex(v =>
            v.node.selectedOptions.some(o =>
              (o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour') &&
              o.value.toLowerCase() === colorParam.toLowerCase()
            )
          );
          setSelectedVariantIdx(matchIdx >= 0 ? matchIdx : 0);
          if (matchIdx >= 0) {
            const variantImage = p.variants.edges[matchIdx]?.node?.image;
            if (variantImage?.url) {
              const imgIdx = p.images.edges.findIndex(img => img.node.url === variantImage.url);
              if (imgIdx >= 0) {
                setSelectedImage(imgIdx);
              } else {
                setOverrideImageUrl(variantImage.url);
              }
            }
          }
        } else {
          setSelectedVariantIdx(0);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [handle, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center py-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-muted-foreground text-lg mb-4">Product not found</p>
          <Link to="/"><Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" />Back to Shop</Button></Link>
        </div>
      </div>
    );
  }

  const variants = product.variants.edges;
  const selectedVariant = variants[selectedVariantIdx]?.node;
  const images = product.images.edges;
  const hasMultipleOptions = product.options.length > 0 && !(product.options.length === 1 && product.options[0].values.length === 1);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    const shopifyProduct: ShopifyProduct = { node: product };
    await addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success(`${product.title} added to cart`);
  };

  const seoDescription = (() => {
    const raw = (product.description || "").replace(/\s+/g, " ").trim();
    if (raw.length >= 50) return raw.slice(0, 300);
    return `${product.title} — ${raw || "shop active seating and focus tools designed to help kids with ADHD and sensory needs stay focused and engaged."}`.slice(0, 300);
  })();
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: seoDescription,
    image: images.map((i) => i.node.url).filter(Boolean),
    sku: selectedVariant?.id,
    brand: { "@type": "Brand", name: "Focusi" },
    offers: {
      "@type": "Offer",
      price: selectedVariant?.price.amount,
      priceCurrency: selectedVariant?.price.currencyCode || "USD",
      availability: selectedVariant?.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://focusi.co/product/${handle}`,
    },
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title={product.title}
        description={seoDescription}
        path={`/product/${handle}`}
        image={images[0]?.node?.url}
        type="product"
        jsonLd={productJsonLd}
      />
      <Navbar />
      <div className="container px-4 py-8 md:py-16">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="mr-1 h-4 w-4" />Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 animate-fade-in-up">
          {/* Images */}
          <div className="space-y-4 min-w-0">
            <div className="aspect-square overflow-hidden rounded-xl bg-muted border border-border">
              {overrideImageUrl ? (
                <img
                  src={overrideImageUrl}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              ) : images[selectedImage]?.node ? (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show product image ${i + 1}`}
                    onClick={() => { setSelectedImage(i); setOverrideImageUrl(null); }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      !overrideImageUrl && i === selectedImage ? 'border-primary' : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <img src={img.node.url} alt={img.node.altText || ''} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{product.title}</h1>
            <p className="text-2xl font-bold text-primary mb-6">
              ${parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
            </p>

            {hasMultipleOptions && (
              <div className="mb-6">
                {product.options.map((option) => (
                  <div key={option.name} className="mb-4">
                    <label className="text-sm font-medium text-foreground mb-2 block">{option.name}</label>
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                      {option.values.map((value) => {
                        const matchingIdx = variants.findIndex(v =>
                          v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                        );
                        const isSelected = selectedVariant?.selectedOptions.some(
                          o => o.name === option.name && o.value === value
                        );
                        const variant = variants[matchingIdx]?.node;
                        return (
                          <button
                            key={value}
                          onClick={() => {
                            if (matchingIdx >= 0) {
                              setSelectedVariantIdx(matchingIdx);
                              const variantImage = variants[matchingIdx]?.node?.image;
                              if (variantImage?.url) {
                                const imgIdx = images.findIndex(img => img.node.url === variantImage.url);
                                if (imgIdx >= 0) {
                                  setSelectedImage(imgIdx);
                                  setOverrideImageUrl(null);
                                } else {
                                  setOverrideImageUrl(variantImage.url);
                                }
                              }
                            }
                          }}
                            disabled={!variant?.availableForSale}
                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                              isSelected
                                ? 'border-primary bg-primary text-primary-foreground'
                                : variant?.availableForSale
                                ? 'border-border hover:border-primary text-foreground'
                                : 'border-border text-muted-foreground opacity-50 cursor-not-allowed'
                            }`}
                          >
                            {value}
                            {isSelected && <Check className="inline ml-1 h-3 w-3" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant?.availableForSale}
              className="w-full md:w-auto gap-2 text-base"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShoppingCart className="h-5 w-5" />}
              {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
            </Button>

            <div className="mt-8 max-w-none overflow-hidden break-words">
              {(() => {
                const bullets = product.description
                  .split(/(?=Helps Kids Stay Focused|Flip to Start|Pomodoro Timer Cube|Visual Timer for Kids|Visual Timer for Classroom|Customizable Kids Visual Timer|Active Sitting|Height Adjustable|360° Swivel|Comfortable Seat|Durable Build)/g)
                  .map(s => s.trim())
                  .filter(Boolean);

                if (bullets.length > 1) {
                  return (
                    <ul className="space-y-3">
                      {bullets.map((bullet, i) => {
                        const periodIndex = bullet.indexOf('. ');
                        const colonIndex = bullet.indexOf(':');
                        // Use period as separator for longer headings, colon for shorter ones
                        const sepIndex = colonIndex > 0 && colonIndex < 80 ? colonIndex : (periodIndex > 0 && periodIndex < 80 ? periodIndex : -1);
                        const sepLen = sepIndex === colonIndex ? 1 : 2; // colon vs ". "
                        if (sepIndex > 0) {
                          return (
                            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                              <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                              <span>
                                <span className="font-bold text-foreground">{bullet.slice(0, sepIndex)}.</span>{' '}
                                <span className="text-muted-foreground">{bullet.slice(sepIndex + sepLen)}</span>
                              </span>
                            </li>
                          );
                        }
                        return (
                          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                            <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                            <span>{bullet}</span>
                          </li>
                        );
                      })}
                    </ul>
                  );
                }
                return <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>;
              })()}
            </div>

            {product.title.toLowerCase().includes("timer") && (
              <ul className="mt-8 space-y-3">
                {[
                  { icon: Clock, label: "Preset Times & Custom Time" },
                  { icon: Puzzle, label: "Countdown & Count-up Modes" },
                  { icon: Eye, label: "Improved Focus" },
                  { icon: Heart, label: "Sensory Support" },
                  { icon: Users, label: "Reduces Restlessness" },
                  { icon: Feather, label: "Compact and Portable" },
                ].map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <ProductBenefits />
      <Footer />
    </div>
  );
};

export default ProductDetail;
