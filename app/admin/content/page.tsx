"use client";

import React, { useState, useEffect } from "react";
import {
  FileEdit,
  Save,
  Send,
  Eye,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  X,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { savePageDraft, publishPage } from "@/lib/supabase/admin";

export default function AdminContentEditorPage() {
  const [activeTab, setActiveTab] = useState<"home" | "about">("home");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [hasUnpublished, setHasUnpublished] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State for Homepage
  const [homeBlocks, setHomeBlocks] = useState({
    heroHeadline: "Pure, Unadulterated Dairy Goodness, Direct from Farm to Family",
    heroHeadlineHi: "खेत से सीधे आपके परिवार तक, शुद्ध और पौष्टिक डेयरी उत्पाद",
    heroTagline: "DIVYAM DAIRY PRODUCTS — KANPUR DEHAT & GWALIOR ROAD",
    heroDescription: "Experience fresh farm milk, slow-churned desi ghee, artisanal paneer, and rich dahi harvested daily in pristine rural conditions.",
    primaryCtaText: "Order on WhatsApp",
    primaryCtaLink: "https://wa.me/917897855030",
    secondaryCtaText: "Explore Pure Products",
    secondaryCtaLink: "/products",
    announcementBanner: "Daily fresh batches delivered within 24 hours across Kanpur, Gwalior & surrounding towns.",
    productSectionTitle: "Fresh Farm Dairy Selection",
    productSectionDescription: "Every batch tested for purity, high SNF, and untouched by chemical adulteration.",
  });

  // Form State for About
  const [aboutBlocks, setAboutBlocks] = useState({
    missionTitle: "Our Pure Milk Promise",
    missionDescription: "At Divyam Dairy, we believe wholesome milk is the foundation of family health. Our cattle feed on green fodder, free of synthetic growth stimulants.",
    storyHeading: "From Village Grasslands to Modern Urban Kitchens",
    storyText: "Founded in Kanpur Dehat, Divyam Dairy bridges the gap between traditional dairy farming wisdom and strict modern cold-chain hygiene.",
    valuesHeadline: "Zero Chemical Preservatives, Pure Cold-Chain Integrity",
  });

  const fetchPageData = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", activeTab)
        .single();

      if (data) {
        setHasUnpublished(data.has_unpublished_changes || false);
        const blocks = data.content_blocks || {};
        if (activeTab === "home") {
          setHomeBlocks((prev) => ({ ...prev, ...blocks }));
        } else {
          setAboutBlocks((prev) => ({ ...prev, ...blocks }));
        }
      }
    } catch (e) {
      console.error("Failed to load page blocks:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, [activeTab]);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const content = activeTab === "home" ? homeBlocks : aboutBlocks;
      await savePageDraft(activeTab, content);
      setHasUnpublished(true);
      setStatusMessage({
        type: "success",
        text: `Draft saved successfully for ${activeTab === "home" ? "Homepage" : "About Us"}. Ready to publish when you are!`,
      });
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to save draft." });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setStatusMessage(null);
    try {
      // Save current content first, then publish
      const content = activeTab === "home" ? homeBlocks : aboutBlocks;
      await savePageDraft(activeTab, content);
      await publishPage(activeTab);
      setHasUnpublished(false);
      setStatusMessage({
        type: "success",
        text: `Published live to the website! Changes are now instantly visible to customers.`,
      });
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to publish." });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Website Content & Text Editor
            </h1>
            {hasUnpublished ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                Unpublished Draft
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Published Live
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Edit headlines, taglines, hero banners, and promotional copy without modifying any underlying code.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>View Live Site</span>
          </a>

          <button
            onClick={handleSaveDraft}
            disabled={isSaving || isPublishing}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-slate-600" />
            <span>{isSaving ? "Saving..." : "Save Draft"}</span>
          </button>

          <button
            onClick={handlePublish}
            disabled={isSaving || isPublishing}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isPublishing ? "Publishing..." : "Publish Live"}</span>
          </button>
        </div>
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

      {/* Page Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("home")}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 transition ${
            activeTab === "home"
              ? "border-[#0B2A6F] text-[#0B2A6F]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Homepage Content Blocks
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 transition ${
            activeTab === "about"
              ? "border-[#0B2A6F] text-[#0B2A6F]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          About Us & Mission Blocks
        </button>
      </div>

      {/* Homepage Form */}
      {activeTab === "home" ? (
        <div className="space-y-6">
          {/* Hero Section Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-slate-900">Hero Section Content</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Homepage Hero Headline (English)
              </label>
              <input
                type="text"
                value={homeBlocks.heroHeadline}
                onChange={(e) => setHomeBlocks({ ...homeBlocks, heroHeadline: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Homepage Hero Headline (Hindi)
              </label>
              <input
                type="text"
                value={homeBlocks.heroHeadlineHi}
                onChange={(e) => setHomeBlocks({ ...homeBlocks, heroHeadlineHi: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Hero Subheading / Tagline
              </label>
              <input
                type="text"
                value={homeBlocks.heroTagline}
                onChange={(e) => setHomeBlocks({ ...homeBlocks, heroTagline: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Hero Description Paragraph
              </label>
              <textarea
                rows={3}
                value={homeBlocks.heroDescription}
                onChange={(e) => setHomeBlocks({ ...homeBlocks, heroDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Primary CTA Button Text
                </label>
                <input
                  type="text"
                  value={homeBlocks.primaryCtaText}
                  onChange={(e) => setHomeBlocks({ ...homeBlocks, primaryCtaText: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Secondary CTA Button Text
                </label>
                <input
                  type="text"
                  value={homeBlocks.secondaryCtaText}
                  onChange={(e) => setHomeBlocks({ ...homeBlocks, secondaryCtaText: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          {/* Announcement & Product Section Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Promotional Banner & Storefront Headings
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Top Announcement Banner Text
              </label>
              <input
                type="text"
                value={homeBlocks.announcementBanner}
                onChange={(e) => setHomeBlocks({ ...homeBlocks, announcementBanner: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Product Showcase Section Title
                </label>
                <input
                  type="text"
                  value={homeBlocks.productSectionTitle}
                  onChange={(e) => setHomeBlocks({ ...homeBlocks, productSectionTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Product Section Description
                </label>
                <input
                  type="text"
                  value={homeBlocks.productSectionDescription}
                  onChange={(e) => setHomeBlocks({ ...homeBlocks, productSectionDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* About Us Form */
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Company Story & Mission Statements
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Mission Statement Title
            </label>
            <input
              type="text"
              value={aboutBlocks.missionTitle}
              onChange={(e) => setAboutBlocks({ ...aboutBlocks, missionTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Mission Statement Description
            </label>
            <textarea
              rows={3}
              value={aboutBlocks.missionDescription}
              onChange={(e) => setAboutBlocks({ ...aboutBlocks, missionDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Company Story Headline
            </label>
            <input
              type="text"
              value={aboutBlocks.storyHeading}
              onChange={(e) => setAboutBlocks({ ...aboutBlocks, storyHeading: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Company Story Paragraph
            </label>
            <textarea
              rows={4}
              value={aboutBlocks.storyText}
              onChange={(e) => setAboutBlocks({ ...aboutBlocks, storyText: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
