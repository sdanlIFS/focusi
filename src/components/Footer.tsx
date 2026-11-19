import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm font-semibold text-foreground tracking-wide">FOCUSI</p>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Smart tools that help kids focus and stay engaged
          </p>
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/refund-policy" className="text-muted-foreground hover:text-foreground transition-colors">
              Refund Policy
            </Link>
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Focusi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
