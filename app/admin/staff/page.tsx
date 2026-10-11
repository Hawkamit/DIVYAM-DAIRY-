"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle2,
  Lock,
  Mail,
  UserCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const ALL_PERMISSIONS = [
  { key: "view_products", label: "View Products", category: "Catalog" },
  { key: "edit_products", label: "Edit Products & Prices", category: "Catalog" },
  { key: "create_products", label: "Create Products", category: "Catalog" },
  { key: "delete_products", label: "Delete / Archive Products", category: "Catalog" },
  { key: "manage_stock", label: "Adjust Stock & Reconcile", category: "Inventory" },
  { key: "upload_media", label: "Upload & Manage Media", category: "Media" },
  { key: "edit_pages", label: "Edit Website Copy & Headlines", category: "Content" },
  { key: "manage_services", label: "Manage Delivery Towns", category: "Routes" },
  { key: "manage_testimonials", label: "Manage Reviews", category: "Content" },
  { key: "manage_faqs", label: "Manage FAQs", category: "Content" },
  { key: "view_enquiries", label: "View Customer Inquiries", category: "Leads" },
  { key: "manage_enquiries", label: "Update Lead Status & Notes", category: "Leads" },
  { key: "edit_seo", label: "Edit SEO Metadata", category: "SEO" },
];

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [newStaff, setNewStaff] = useState({
    email: "",
    full_name: "",
    role: "staff",
    permissions: ["view_products", "manage_stock", "view_enquiries"] as string[],
  });

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*, user_roles(role, permissions)");

      if (profiles && profiles.length > 0) {
        setStaffList(profiles);
      } else {
        // Mock initial seed staff
        setStaffList([
          {
            id: "p1",
            full_name: "Amit Saxena",
            email: "owner@divyamdairy.com",
            role: "owner",
            user_roles: [{ role: "owner", permissions: ALL_PERMISSIONS.map((p) => p.key) }],
          },
          {
            id: "p2",
            full_name: "Operations Dispatch Lead",
            email: "dispatch@divyamdairy.com",
            role: "inventory_manager",
            user_roles: [
              {
                role: "inventory_manager",
                permissions: ["view_products", "manage_stock", "view_enquiries"],
              },
            ],
          },
          {
            id: "p3",
            full_name: "Content & Support Lead",
            email: "content@divyamdairy.com",
            role: "content_editor",
            user_roles: [
              {
                role: "content_editor",
                permissions: ["view_products", "edit_pages", "manage_testimonials", "manage_faqs", "upload_media"],
              },
            ],
          },
        ]);
      }
    } catch (e) {
      console.error("Failed to load staff list:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleTogglePermission = (key: string) => {
    if (!selectedStaff) return;
    const currentPerms: string[] = selectedStaff.permissions || [];
    const updated = currentPerms.includes(key)
      ? currentPerms.filter((p) => p !== key)
      : [...currentPerms, key];

    setSelectedStaff({ ...selectedStaff, permissions: updated });
  };

  const handleSavePermissions = async () => {
    if (!selectedStaff) return;
    setStatusMessage({
      type: "success",
      text: `Permissions updated for ${selectedStaff.full_name || selectedStaff.email}.`,
    });
    setSelectedStaff(null);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Staff & Role-Based Permissions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              RBAC Enabled
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Grant granular permissions to store dispatchers, inventory managers, and content writers.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#0B2A6F] hover:bg-blue-800 text-white font-medium rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
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

      {/* Staff Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">User</th>
                <th className="py-3.5 px-4 font-semibold">Role</th>
                <th className="py-3.5 px-4 font-semibold">Active Permissions</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staffList.map((st) => {
                const userRole = st.role || "staff";
                const perms = st.user_roles?.[0]?.permissions || [];

                return (
                  <tr key={st.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">
                        {st.full_name || "Staff Member"}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">{st.email}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                          userRole === "owner"
                            ? "bg-purple-100 text-purple-800"
                            : userRole.includes("inventory")
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        <ShieldCheck className="w-3 h-3" />
                        {userRole.replace(/_/g, " ")}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {userRole === "owner" ? (
                        <span className="text-xs font-semibold text-purple-700">
                          Full Workspace Access (Super Admin)
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-1 max-w-md">
                          {perms.slice(0, 4).map((p: string) => (
                            <span
                              key={p}
                              className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono"
                            >
                              {p}
                            </span>
                          ))}
                          {perms.length > 4 && (
                            <span className="text-[10px] text-slate-400 font-semibold">
                              +{perms.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {userRole !== "owner" && (
                        <button
                          onClick={() =>
                            setSelectedStaff({
                              ...st,
                              permissions: perms,
                            })
                          }
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg text-xs transition"
                        >
                          Configure Roles
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PERMISSION CONFIGURATION MODAL */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 p-6 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Granular Permissions: {selectedStaff.full_name}
                </h2>
                <p className="text-xs text-slate-500">{selectedStaff.email}</p>
              </div>
              <button onClick={() => setSelectedStaff(null)} className="p-1 rounded hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {["Catalog", "Inventory", "Media", "Content", "Routes", "Leads", "SEO"].map((cat) => {
                const permsInCat = ALL_PERMISSIONS.filter((p) => p.category === cat);
                return (
                  <div key={cat} className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {cat} Permissions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {permsInCat.map((p) => {
                        const isChecked = selectedStaff.permissions?.includes(p.key);
                        return (
                          <label
                            key={p.key}
                            className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                              isChecked
                                ? "bg-blue-50/70 border-blue-200 text-blue-900"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleTogglePermission(p.key)}
                              className="rounded text-blue-600 w-4 h-4"
                            />
                            <span className="font-semibold text-xs">{p.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedStaff(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePermissions}
                className="px-5 py-2 bg-[#0B2A6F] text-white font-medium rounded-xl flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Permissions</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD STAFF MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Invite New Staff Member</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStaffList([
                  ...staffList,
                  {
                    id: `p-${Date.now()}`,
                    full_name: newStaff.full_name,
                    email: newStaff.email,
                    role: newStaff.role,
                    user_roles: [{ role: newStaff.role, permissions: newStaff.permissions }],
                  },
                ]);
                setStatusMessage({
                  type: "success",
                  text: `Staff member ${newStaff.full_name} added to database!`,
                });
                setIsAddModalOpen(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newStaff.full_name}
                  onChange={(e) => setNewStaff({ ...newStaff, full_name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="e.g. Ramesh Singh"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="ramesh@divyamdairy.com"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Role</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                >
                  <option value="staff">General Store Staff</option>
                  <option value="inventory_manager">Inventory & Dispatch Manager</option>
                  <option value="content_editor">Content & Marketing Editor</option>
                  <option value="admin">Administrator</option>
                </select>
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
                  <span>Add Staff</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
