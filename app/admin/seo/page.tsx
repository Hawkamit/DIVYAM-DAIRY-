"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Globe,
  Save,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateSEOMetadata } from "@/lib/supabase/admin";

const PAGES = [
  { slug: "home", label: "Homepage (/)" },
  { slug: "products", label: "Products Catalog (/products)" },
  { slug: "about", label: "About Us & Story (/about)" },
  { slug: "farm-to-family", label: "Farm to Family (/farm-to-family)" },
  { slug: "delivery", label: "Delivery Routes (/delivery)" },
  { slug: "faq", label: "FAQs (/faq)" },
  { slug: "contact", label: "Contact Us (/contact)" },
];

export default function AdminSEOPage() {
  const [selectedSlug, setSelectedSlug] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [seoData, setSeoData] = useState({
    title: "",
    meta_description: "",
    keywords: [] as string[],
    og_title: "",
    og_description: "",
    og_image: "",
    canonical_url: "",
    robots_index: true,
  });

  const fetchSeoForSlug = async (slug: string) => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("seo_metadata")
        .select("*")
        .eq("page_slug", slug)
        .single();

      if (data) {
        setSeoData({
          title: data.title || "",
          meta_description: data.meta_description || "",
          keywords: data.keywords || [],
          og_title: data.og_title || data.title || "",
          og_description: data.og_description || data.meta_description || "",
          og_image: data.og_image || "",
          canonical_url: data.canonical_url || "",
          robots_index: data.robots_index ?? true,
        });
      } else {
        // Defaults
        setSeoData({
          title: "Divyam Dairy Products | Pure Desi Milk & Ghee",
          meta_description: "Fresh farm milk, desi ghee, paneer, and dahi delivered daily across Kanpur Dehat & Gwalior Road.",
          keywords: ["Divyam Dairy", "A2 Milk", "Pure Ghee", "Kanpur Dairy"],
          og_title: "Divyam Dairy Products",
          og_description: "Pure farm dairy harvested daily in rural Kanpur.",
          og_image: "/images/og/divyam-social-share.jpg",
          canonical_url: `https://divyamdairy.com/${slug === "home" ? "" : slug}`,
          robots_index: true,
        });
      }
    } catch (e) {
      console.error("Failed to load SEO data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoForSlug(selectedSlug);
  }, [selectedSlug]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      await updateSEOMetadata(selectedSlug, {
        title: seoData.title,
        meta_description: seoData.meta_description,
        og_title: seoData.og_title,
        og_description: seoData.og_description,
        og_image: seoData.og_image,
        canonical_url: seoData.canonical_url,
        robots_index: seoData.robots_index,
      });

      setStatusMessage({
        type: "success",
        text: `SEO metadata for "${selectedSlug}" updated and synced to database!`,
      });
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to update SEO metadata." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              SEO & Social Sharing Metadata
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Search Console Ready
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure Google search titles, meta descriptions, Open Graph preview cards, and indexing directives.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 bg-[#0B2A6F] hover:bg-blue-800 text-white font-medium rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save SEO Settings"}</span>
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs sm:text-sm ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Select Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {PAGES.map((p) => (
          <button
            key={p.slug}
            onClick={() => setSelectedSlug(p.slug)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedSlug === p.slug
                ? "bg-[#0B2A6F] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Form (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Page Title Tag (Recommended ≤ 60 chars)
              </label>
              <input
                type="text"
                required
                value={seoData.title}
                onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Length: {seoData.title.length} characters
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Meta Description (Recommended ≤ 160 chars)
              </label>
              <textarea
                rows={3}
                required
                value={seoData.meta_description}
                onChange={(e) => setSeoData({ ...seoData, meta_description: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Length: {seoData.meta_description.length} characters
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Open Graph (OG) Title
                </label>
                <input
                  type="text"
                  value={seoData.og_title}
                  onChange={(e) => setSeoData({ ...seoData, og_title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={seoData.canonical_url}
                  onChange={(e) => setSeoData({ ...seoData, canonical_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Social Share Image URL (OG Image)
              </label>
              <input
                type="text"
                value={seoData.og_image}
                onChange={(e) => setSeoData({ ...seoData, og_image: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-mono text-xs"
                placeholder="https://.../og-banner.jpg"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={seoData.robots_index}
                  onChange={(e) => setSeoData({ ...seoData, robots_index: e.target.checked })}
                  className="rounded text-blue-600 w-4 h-4"
                />
                <span className="font-semibold text-slate-700">
                  Allow Search Engine Indexing (robots: index, follow)
                </span>
              </label>
            </div>
          </form>
        </div>

        {/* Live Search Engine Preview Box (1 Col) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Google SERP Preview</span>
            </h2>

            {/* Google snippet mock */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-sans space-y-1">
              <div className="text-[11px] text-slate-600 font-mono truncate">
                {seoData.canonical_url || "https://divyamdairy.com"}
              </div>
              <h3 className="text-sm font-medium text-[#1a0dab] hover:underline cursor-pointer line-clamp-1">
                {seoData.title || "Divyam Dairy Products"}
              </h3>
              <p className="text-xs text-[#4d5156] line-clamp-2">
                {seoData.meta_description || "Fresh farm dairy delivered daily across Kanpur Dehat."}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <p>✔ Auto-generates standard JSON-LD Schema</p>
              <p>✔ Compliant with Google Search Guidelines</p>
              <p>✔ Social WhatsApp & Twitter Card Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
