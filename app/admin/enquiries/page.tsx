"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Archive,
  RefreshCw,
  Search,
  Filter,
  Save,
  X,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateEnquiryStatus } from "@/lib/supabase/admin";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [adminNotes, setAdminNotes] = useState("");
  const [newStatus, setNewStatus] = useState<"new" | "contacted" | "resolved" | "archived">("contacted");

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setEnquiries(data);
    } catch (e) {
      console.error("Failed to load customer inquiries:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleOpenDetail = (enq: any) => {
    setSelectedEnquiry(enq);
    setNewStatus(enq.status);
    setAdminNotes(enq.admin_notes || "");
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    setIsUpdating(true);
    try {
      await updateEnquiryStatus(selectedEnquiry.id, newStatus, adminNotes);
      setStatusMessage({ type: "success", text: "Enquiry status updated successfully!" });
      setSelectedEnquiry(null);
      await fetchEnquiries();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to update enquiry." });
    } finally {
      setIsUpdating(false);
    }
  };

  const filtered = enquiries.filter((e) => {
    const q = searchQuery.toLowerCase();
    const matchesQ =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.phone.includes(q) ||
      (e.email && e.email.toLowerCase().includes(q)) ||
      (e.message && e.message.toLowerCase().includes(q));

    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    return matchesQ && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Customer Enquiries & Orders
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
              {enquiries.length} Submissions
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Incoming website leads, product inquiries, delivery questions, and WhatsApp callback requests.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
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

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inquiries by customer name, phone number, or text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["all", "new", "contacted", "resolved", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition ${
                statusFilter === st
                  ? "bg-[#0B2A6F] text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                <th className="py-3.5 px-4 font-semibold">Subject / Message</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Submitted</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((enq) => {
                const cleanPhone = enq.phone.replace(/[^0-9]/g, "");
                const waUrl = `https://wa.me/91${cleanPhone.slice(-10)}?text=${encodeURIComponent(
                  `Namaste ${enq.name}, thank you for contacting Divyam Dairy Products! How can we assist you with your milk & dairy order today?`
                )}`;

                return (
                  <tr key={enq.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {enq.name}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-slate-700">{enq.phone}</span>
                        {enq.email && (
                          <span className="text-[11px] text-slate-400">{enq.email}</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      {enq.subject && (
                        <p className="font-semibold text-slate-800 text-xs truncate">
                          {enq.subject}
                        </p>
                      )}
                      <p className="text-slate-600 text-xs truncate">{enq.message}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase ${
                          enq.status === "new"
                            ? "bg-blue-100 text-blue-700"
                            : enq.status === "contacted"
                            ? "bg-amber-100 text-amber-700"
                            : enq.status === "resolved"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
                          title="Open WhatsApp Direct Chat"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenDetail(enq)}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition"
                        >
                          Review
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL / STATUS MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Customer Inquiry Details</h2>
                <p className="text-xs text-slate-500">From {selectedEnquiry.name}</p>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} className="p-1 rounded hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Phone:</span>
                <span className="font-semibold text-slate-900">{selectedEnquiry.phone}</span>
              </div>
              {selectedEnquiry.email && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-semibold text-slate-900">{selectedEnquiry.email}</span>
                </div>
              )}
              {selectedEnquiry.subject && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Subject:</span>
                  <span className="font-semibold text-slate-900">{selectedEnquiry.subject}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 text-xs">
                <span className="text-slate-500 block mb-1">Message:</span>
                <p className="text-slate-800 bg-white p-3 rounded-lg border border-slate-200 whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lead Workflow Status</label>
                <select
                  value={newStatus}
                  onChange={(e: any) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                >
                  <option value="new">New (Unaddressed)</option>
                  <option value="contacted">Contacted via Phone / WhatsApp</option>
                  <option value="resolved">Resolved / Order Placed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Staff / Admin Notes</label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="e.g. Called customer at 10 AM, scheduled 2L milk daily delivery starting tomorrow..."
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 bg-[#0B2A6F] text-white font-medium rounded-xl flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isUpdating ? "Saving..." : "Update Status"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
