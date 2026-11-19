import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SHOPIFY_STORE_PERMANENT_DOMAIN } from "@/lib/shopify";

const NotFound = () => {
  const location = useLocation();
  const isCheckoutRoute = location.pathname.startsWith("/cart/c/");
  const alreadyRetried = new URLSearchParams(location.search).has("lovable_checkout_retry");

  useEffect(() => {
    if (isCheckoutRoute && !alreadyRetried) {
      const redirectUrl = new URL(`https://${SHOPIFY_STORE_PERMANENT_DOMAIN}${location.pathname}${location.search}`);
      redirectUrl.searchParams.set("lovable_checkout_retry", "1");
      window.location.replace(redirectUrl.toString());
      return;
    }

    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [isCheckoutRoute, alreadyRetried, location.pathname, location.search]);

  if (isCheckoutRoute && !alreadyRetried) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold">Redirecting to checkout...</h1>
          <p className="text-muted-foreground">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (isCheckoutRoute && alreadyRetried) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center max-w-lg px-6">
          <h1 className="mb-4 text-2xl font-semibold">Checkout domain needs fixing</h1>
          <p className="mb-4 text-muted-foreground">
            Your store is sending checkout to this site domain instead of the Shopify checkout domain. I can help you fix this quickly.
          </p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
