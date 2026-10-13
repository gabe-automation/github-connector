import { Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroScene = lazy(() => import("./HeroScene"));

export function SiteNav() {
  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link to="/" className="font-display text-lg font-semibold tracking-tight">WebCraft</Link>
      <div className="flex items-center gap-6 text-sm">
        <Link to="/about" className="text-muted-foreground transition-colors hover:text-foreground">About</Link>
        <Link to="/terms" className="text-muted-foreground transition-colors hover:text-foreground">Terms</Link>
        <Button asChild size="sm" variant="outline" className="rounded-full px-4">
          <Link to="/auth">Sign in</Link>
        </Button>
      </div>
    </nav>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <section className="relative overflow-hidden">
      {/* soft ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 20%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 70%), radial-gradient(40% 40% at 15% 80%, color-mix(in oklab, var(--accent) 7%, transparent), transparent 70%)",
        }}
      />
      <SiteNav />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-10 sm:pt-16">
        <div className="mx-auto max-w-3xl text-center animate-rise">
          <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-primary" />
            Real-time collaboration, rebuilt for 2026
          </p>
          <h1 className="text-5xl font-semibold leading-[1.04] tracking-tight sm:text-7xl">
            Build websites
            <br />
            together, <span className="text-primary">live.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Designers and developers edit the same page at the same time. Only the block you touch is reserved — everyone else keeps moving.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link to="/auth">
                Start building free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full px-7">
              <a href="#templates">Browse templates</a>
            </Button>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">No credit card · Free forever plan</p>
        </div>

        {/* 3D visual */}
        <div className="relative mx-auto mt-14 h-[320px] max-w-4xl sm:h-[420px]">
          <div
            aria-hidden
            className="absolute inset-x-8 bottom-0 top-10 rounded-3xl border bg-card/50 shadow-soft backdrop-blur-sm"
          />
          {mounted && (
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          )}
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
