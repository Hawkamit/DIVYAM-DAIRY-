"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Building,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateSiteSettings } from "@/lib/supabase/admin";

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [settings, setSettings] = useState({
    brand_name: "Divyam Dairy Products",
    legal_entity: "Divyam Dairy Enterprises",
    tagline_en: "Pure Desi Dairy Direct From Farm To Family",
    tagline_hi: "खेत से परिवार तक शुद्ध देसी डेयरी उत्पाद",
    phone_primary: "+91 78978 55030",
    phone_secondary: "+91 80521 21477",
    whatsapp_primary: "+91 78978 55030",
    whatsapp_digits: "917897855030",
    email: "divyamdairyproduct@gmail.com",
    address: "Bhewan Road, Near Primary School, Vill. Bhewan, Akbarpur, Kanpur Dehat, Uttar Pradesh 209101",
    address_short: "Vill. Bhewan, Akbarpur, Kanpur Dehat",
    timings: "Open Daily: 06:00 AM – 09:00 PM IST",
    fssai_number: "22724107000213",
    gst_number: "09ABCDE1234F1Z5",
    instagram_url: "https://instagram.com/divyamdairy",
    facebook_url: "https://facebook.com/divyamdairy",
    google_maps_url: "https://maps.google.com/?q=Akbarpur+Kanpur+Dehat",
    min_order_perishable: 100,
    min_order_ghee: 499,
  });

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .single();

      if (data) {
        setSettings((prev) => ({ ...prev, ...data }));
      }
    } catch (e) {
      console.error("Failed to load site settings:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      await updateSiteSettings({
        brand_name: settings.brand_name,
        legal_entity: settings.legal_entity,
        tagline_en: settings.tagline_en,
        tagline_hi: settings.tagline_hi,
        phone_primary: settings.phone_primary,
        phone_secondary: settings.phone_secondary,
        whatsapp_primary: settings.whatsapp_primary,
        whatsapp_digits: settings.whatsapp_digits,
        email: settings.email,
        address: settings.address,
        address_short: settings.address_short,
        timings: settings.timings,
        fssai_number: settings.fssai_number,
        gst_number: settings.gst_number,
        instagram_url: settings.instagram_url,
        facebook_url: settings.facebook_url,
        google_maps_url: settings.google_maps_url,
        min_order_perishable: Number(settings.min_order_perishable),
        min_order_ghee: Number(settings.min_order_ghee),
      });

      setStatusMessage({
        type: "success",
        text: "Business & contact settings saved and updated across the live website!",
      });
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to update settings." });
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
              Site & Business Settings
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              Global Config
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Update telephone lines, WhatsApp order routing numbers, official FSSAI licensing, and physical plant address.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 bg-[#0B2A6F] hover:bg-blue-800 text-white font-medium rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save Settings"}</span>
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

      <form onSubmit={handleSave} className="space-y-6 text-xs sm:text-sm">
        {/* Brand & Entity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-600" />
            <span>Brand Identity & Legal Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Brand Name</label>
              <input
                type="text"
                required
                value={settings.brand_name}
                onChange={(e) => setSettings({ ...settings, brand_name: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Legal Registered Entity</label>
              <input
                type="text"
                required
                value={settings.legal_entity}
                onChange={(e) => setSettings({ ...settings, legal_entity: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tagline (English)</label>
              <input
                type="text"
                value={settings.tagline_en}
                onChange={(e) => setSettings({ ...settings, tagline_en: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tagline (Hindi)</label>
              <input
                type="text"
                value={settings.tagline_hi}
                onChange={(e) => setSettings({ ...settings, tagline_hi: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">FSSAI License Number</label>
              <input
                type="text"
                value={settings.fssai_number}
                onChange={(e) => setSettings({ ...settings, fssai_number: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">GST Registration Number</label>
              <input
                type="text"
                value={settings.gst_number}
                onChange={(e) => setSettings({ ...settings, gst_number: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & WhatsApp */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Communication & Order Routing Lines</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary Call Phone</label>
              <input
                type="text"
                value={settings.phone_primary}
                onChange={(e) => setSettings({ ...settings, phone_primary: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Secondary Call Phone</label>
              <input
                type="text"
                value={settings.phone_secondary}
                onChange={(e) => setSettings({ ...settings, phone_secondary: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">WhatsApp Order Digits</label>
              <input
                type="text"
                value={settings.whatsapp_digits}
                onChange={(e) => setSettings({ ...settings, whatsapp_digits: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-mono"
                placeholder="e.g. 917897855030"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Daily Operating Timings</label>
              <input
                type="text"
                value={settings.timings}
                onChange={(e) => setSettings({ ...settings, timings: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Plant & Farm Physical Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        {/* Social & Minimum Order */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Social Media & Delivery Order Thresholds
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Instagram URL</label>
              <input
                type="url"
                value={settings.instagram_url}
                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Facebook URL</label>
              <input
                type="url"
                value={settings.facebook_url}
                onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Min Order Amount: Fresh Perishables (₹)
              </label>
              <input
                type="number"
                value={settings.min_order_perishable}
                onChange={(e) => setSettings({ ...settings, min_order_perishable: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Min Order Amount: Desi Ghee (₹)
              </label>
              <input
                type="number"
                value={settings.min_order_ghee}
                onChange={(e) => setSettings({ ...settings, min_order_ghee: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
