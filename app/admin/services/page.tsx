"use client";

import React, { useState, useEffect } from "react";
import {
  Truck,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateService } from "@/lib/supabase/admin";

export default function AdminServicesPage() {
  const [towns, setTowns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTown, setEditingTown] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [newTown, setNewTown] = useState({
    name: "",
    name_hi: "",
    status: "active",
    note: "Daily morning doorstep supply",
    note_hi: "दैनिक सुबह घर-घर आपूर्ति",
    dispatch_time: "Within 24 hours",
    is_active: true,
    sort_order: 10,
  });

  const fetchTowns = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });

      if (data) setTowns(data);
    } catch (e) {
      console.error("Failed to load delivery towns:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTowns();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTown) return;
    try {
      await updateService(editingTown.id, {
        name: editingTown.name,
        name_hi: editingTown.name_hi,
        status: editingTown.status,
        note: editingTown.note,
        note_hi: editingTown.note_hi,
        dispatch_time: editingTown.dispatch_time,
        is_active: editingTown.is_active,
      });
      setStatusMessage({ type: "success", text: `Town "${editingTown.name}" updated successfully!` });
      setEditingTown(null);
      await fetchTowns();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to update town." });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const supabase = createClient();
      const { data: ws } = await supabase.from("websites").select("id").limit(1).single();

      await supabase.from("services").insert({
        ...newTown,
        website_id: ws?.id || null,
      });

      setStatusMessage({ type: "success", text: `Added "${newTown.name}" to delivery network!` });
      setIsAddModalOpen(false);
      setNewTown({
        name: "",
        name_hi: "",
        status: "active",
        note: "Daily morning doorstep supply",
        note_hi: "दैनिक सुबह घर-घर आपूर्ति",
        dispatch_time: "Within 24 hours",
        is_active: true,
        sort_order: towns.length + 1,
      });
      await fetchTowns();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to add town." });
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Delivery Coverage & Route Hubs
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              {towns.length} Coverage Points
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure towns served by the refrigerated cold-chain fleet and update delivery schedules.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#0B2A6F] hover:bg-blue-800 text-white font-medium rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Delivery Town</span>
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

      {/* Towns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {towns.map((town) => (
          <div
            key={town.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {town.name}
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                    town.status === "active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {town.status}
                </span>
              </div>
              <p className="text-xs text-amber-900/80 font-medium">{town.name_hi}</p>
              <p className="text-xs text-slate-600 mt-2">{town.note}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2 font-mono">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{town.dispatch_time || "Within 24 hours"}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {town.is_active ? "● Live on Site" : "Hidden"}
              </span>
              <button
                onClick={() => setEditingTown({ ...town })}
                className="px-3 py-1 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-800 font-semibold rounded-lg text-xs transition flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Route</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingTown && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Edit Delivery Town</h2>
              <button onClick={() => setEditingTown(null)} className="p-1 rounded hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Town Name (English)</label>
                <input
                  type="text"
                  required
                  value={editingTown.name}
                  onChange={(e) => setEditingTown({ ...editingTown, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Town Name (Hindi)</label>
                <input
                  type="text"
                  value={editingTown.name_hi || ""}
                  onChange={(e) => setEditingTown({ ...editingTown, name_hi: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Delivery Status</label>
                <select
                  value={editingTown.status}
                  onChange={(e) => setEditingTown({ ...editingTown, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                >
                  <option value="active">Active Delivery Route</option>
                  <option value="expanding">Expanding Soon</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dispatch Timeframe</label>
                <input
                  type="text"
                  value={editingTown.dispatch_time || ""}
                  onChange={(e) => setEditingTown({ ...editingTown, dispatch_time: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Delivery Note</label>
                <input
                  type="text"
                  value={editingTown.note || ""}
                  onChange={(e) => setEditingTown({ ...editingTown, note: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTown(null)}
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Add New Delivery Town</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Town Name (English) *</label>
                <input
                  type="text"
                  required
                  value={newTown.name}
                  onChange={(e) => setNewTown({ ...newTown, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="e.g. Bhognipur"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Town Name (Hindi)</label>
                <input
                  type="text"
                  value={newTown.name_hi}
                  onChange={(e) => setNewTown({ ...newTown, name_hi: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="e.g. भोगनीपुर"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Delivery Status</label>
                <select
                  value={newTown.status}
                  onChange={(e) => setNewTown({ ...newTown, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                >
                  <option value="active">Active Delivery Route</option>
                  <option value="expanding">Expanding Soon</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dispatch Timeframe</label>
                <input
                  type="text"
                  value={newTown.dispatch_time}
                  onChange={(e) => setNewTown({ ...newTown, dispatch_time: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
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
                  <span>Add Town</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
