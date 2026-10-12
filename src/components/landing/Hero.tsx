import { Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const HeroScene = lazy(() => import("./HeroScene"));

export function SiteNav() {
  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <Link to="/" className="font-display text-xl font-semibold">WebCraft</Link>
      <div className="flex items-center gap-5 text-sm">
        <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
        <Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link>
        <Button asChild size="sm"><Link to="/auth">Sign in</Link></Button>
      </div>
    </nav>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <section className="relative overflow-hidden border-b">
      <SiteNav />
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 pb-16 pt-6 lg:grid-cols-2">
        <div className="animate-rise">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Collaborative website builder</p>
          <h1 className="text-5xl leading-[1.05] sm:text-6xl">Build websites together, live.</h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">Designers and developers edit the same page at once. Only the block you touch is reserved — everyone else keeps moving.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link to="/auth">Start building free</Link></Button>
            <Button asChild size="lg" variant="outline"><a href="#templates">Browse templates</a></Button>
          </div>
        </div>
        <div className="h-[340px] sm:h-[440px]">
          {mounted && <Suspense fallback={null}><HeroScene /></Suspense>}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} WebCraft</span>
        <div className="flex gap-5"><Link to="/about">About</Link><Link to="/terms">Terms & Conditions</Link></div>
      </div>
    </footer>
  );
}
