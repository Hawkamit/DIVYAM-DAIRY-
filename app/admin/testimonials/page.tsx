"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Star,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/supabase/admin";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [newItem, setNewItem] = useState({
    author_name: "",
    author_role: "Family Homemaker",
    location: "Kanpur",
    quote: "",
    quote_hi: "",
    rating: 5,
    is_active: true,
    sort_order: 10,
  });

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("sort_order", { ascending: true });

      if (data) setTestimonials(data);
    } catch (e) {
      console.error("Failed to load testimonials:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTestimonial(newItem);
      setStatusMessage({ type: "success", text: "New testimonial published successfully!" });
      setIsAddModalOpen(false);
      setNewItem({
        author_name: "",
        author_role: "Family Homemaker",
        location: "Kanpur",
        quote: "",
        quote_hi: "",
        rating: 5,
        is_active: true,
        sort_order: testimonials.length + 1,
      });
      await fetchTestimonials();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to add testimonial." });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      await updateTestimonial(editingItem.id, {
        author_name: editingItem.author_name,
        author_role: editingItem.author_role,
        location: editingItem.location,
        quote: editingItem.quote,
        quote_hi: editingItem.quote_hi,
        rating: editingItem.rating,
        is_active: editingItem.is_active,
      });
      setStatusMessage({ type: "success", text: "Testimonial updated successfully!" });
      setEditingItem(null);
      await fetchTestimonials();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to update testimonial." });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteTestimonial(id);
      setStatusMessage({ type: "success", text: "Review removed." });
      await fetchTestimonials();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: "Failed to delete review." });
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Customer Reviews & Testimonials
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              {testimonials.length} Testimonials
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage genuine customer endorsements, ratings, and feedback displayed across the website.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#0B2A6F] hover:bg-blue-800 text-white font-medium rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
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

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between gap-4"
          >
            <div>
              {/* Star Rating & Status */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {item.is_active ? (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Active
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Hidden
                  </span>
                )}
              </div>

              {/* Quote text */}
              <p className="text-xs sm:text-sm text-slate-700 italic">
                &ldquo;{item.quote}&rdquo;
              </p>
              {item.quote_hi && (
                <p className="text-xs text-amber-900/80 font-medium mt-1">
                  {item.quote_hi}
                </p>
              )}
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">{item.author_name}</p>
                <p className="text-[11px] text-slate-500">
                  {item.author_role} • {item.location}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingItem({ ...item })}
                  className="p-1.5 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Edit Customer Review</h2>
              <button onClick={() => setEditingItem(null)} className="p-1 rounded hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    required
                    value={editingItem.author_name}
                    onChange={(e) => setEditingItem({ ...editingItem, author_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingItem.location || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Review Quote (English)</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.quote}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Review Quote (Hindi)</label>
                <textarea
                  rows={2}
                  value={editingItem.quote_hi || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, quote_hi: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.is_active}
                    onChange={(e) => setEditingItem({ ...editingItem, is_active: e.target.checked })}
                    className="rounded text-blue-600 w-4 h-4"
                  />
                  <span className="font-semibold text-slate-700">Display on Storefront</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2A6F] text-white font-medium rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Add Customer Testimonial</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={newItem.author_name}
                    onChange={(e) => setNewItem({ ...newItem, author_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    placeholder="e.g. Smt. Sunita Sharma"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Town / City</label>
                  <input
                    type="text"
                    value={newItem.location}
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    placeholder="e.g. Akbarpur"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer Quote (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={newItem.quote}
                  onChange={(e) => setNewItem({ ...newItem, quote: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="The richness and malai thickness of Divyam milk reminds us of village farms..."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer Quote (Hindi)</label>
                <textarea
                  rows={2}
                  value={newItem.quote_hi}
                  onChange={(e) => setNewItem({ ...newItem, quote_hi: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="शुद्ध मलाई और ताज़गी..."
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2A6F] text-white font-medium rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
