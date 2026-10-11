import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { Home, ShoppingBag, Phone, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-50 pt-32 pb-24 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center space-y-8 bg-white p-8 sm:p-14 rounded-3xl border border-line shadow-soft">
        {/* Milk Splash illustration motif */}
        <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden bg-blue-50 border-4 border-white shadow-md">
          <SmartImage
            src="/images/generated/hero-milk-splash.jpg"
            alt="Spilled milk splash"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900 tracking-tight">
            This page seems to have wandered off the farm.
          </h1>

          <p className="text-sm sm:text-base text-ink-600 font-sans leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Don&apos;t cry over spilled milk — let&apos;s get you back home!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button variant="primary" size="md" href="/">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Button variant="outline" size="md" href="/products">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Explore Products
          </Button>

          <Button variant="ghost" size="md" href="/contact">
            <Phone className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
