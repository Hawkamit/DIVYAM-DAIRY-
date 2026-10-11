"use client";

import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { createFAQ, updateFAQ, deleteFAQ } from "@/lib/supabase/admin";

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [newFaq, setNewFaq] = useState({
    category: "quality",
    question: "",
    question_hi: "",
    answer: "",
    answer_hi: "",
    is_active: true,
    sort_order: 10,
  });

  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("faqs")
        .select("*")
        .order("sort_order", { ascending: true });

      if (data) setFaqs(data);
    } catch (e) {
      console.error("Failed to load FAQs:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFAQ(newFaq);
      setStatusMessage({ type: "success", text: "New FAQ added successfully!" });
      setIsAddModalOpen(false);
      setNewFaq({
        category: "quality",
        question: "",
        question_hi: "",
        answer: "",
        answer_hi: "",
        is_active: true,
        sort_order: faqs.length + 1,
      });
      await fetchFaqs();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to add FAQ." });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    try {
      await updateFAQ(editingFaq.id, {
        question: editingFaq.question,
        question_hi: editingFaq.question_hi,
        answer: editingFaq.answer,
        answer_hi: editingFaq.answer_hi,
        category: editingFaq.category,
        is_active: editingFaq.is_active,
      });
      setStatusMessage({ type: "success", text: "FAQ updated successfully!" });
      setEditingFaq(null);
      await fetchFaqs();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to update FAQ." });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await deleteFAQ(id);
      setStatusMessage({ type: "success", text: "FAQ removed." });
      await fetchFaqs();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: "Failed to delete FAQ." });
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Customer FAQ Manager
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              {faqs.length} Questions
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Maintain bilingual customer questions on milk testing, shelf life, delivery, and cold chain.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#0B2A6F] hover:bg-blue-800 text-white font-medium rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
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

      {/* FAQs List */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={faq.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Q{idx + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {faq.category}
                </span>
                {faq.is_active ? (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    Hidden
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {faq.question}
              </h3>
              <p className="text-xs font-medium text-amber-900/80">
                {faq.question_hi}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 pt-1 border-t border-slate-100 mt-2">
                {faq.answer}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0 pt-2 md:pt-0">
              <button
                onClick={() => setEditingFaq({ ...faq })}
                className="p-2 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                title="Edit FAQ"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="p-2 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                title="Delete FAQ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 p-6 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Edit FAQ</h2>
              <button onClick={() => setEditingFaq(null)} className="p-1 rounded hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Question (English)</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Question (Hindi)</label>
                <input
                  type="text"
                  value={editingFaq.question_hi || ""}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question_hi: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Answer (English)</label>
                <textarea
                  rows={3}
                  required
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingFaq.is_active}
                    onChange={(e) => setEditingFaq({ ...editingFaq, is_active: e.target.checked })}
                    className="rounded text-blue-600 w-4 h-4"
                  />
                  <span className="font-semibold text-slate-700">Display on Public FAQ Page</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2A6F] text-white font-medium rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 p-6 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Add New FAQ</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newFaq.category}
                  onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                >
                  <option value="quality">Quality & Purity</option>
                  <option value="delivery">Delivery & Towns</option>
                  <option value="ordering">Ordering & Payment</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Question (English) *</label>
                <input
                  type="text"
                  required
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="e.g. Is Divyam Milk tested for adulterants daily?"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Question (Hindi)</label>
                <input
                  type="text"
                  value={newFaq.question_hi}
                  onChange={(e) => setNewFaq({ ...newFaq, question_hi: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="e.g. क्या दिव्यम दूध की दैनिक शुद्धता जांच होती है?"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Answer (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="Yes, every collection batch undergoes rapid purity, SNF, and fat testing..."
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
                  <span>Add FAQ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
