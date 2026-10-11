"use client";

import React, { useState, useEffect } from "react";
import {
  Boxes,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  History,
  Plus,
  Minus,
  RefreshCw,
  X,
  Search,
  Filter,
  Save,
  Package,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { adjustStock } from "@/lib/supabase/admin";

export default function AdminInventoryPage() {
  const [inventoryList, setInventoryList] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Adjustment Modal state
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<"addition" | "reduction" | "reconciliation" | "damage">("addition");
  const [deltaQuantity, setDeltaQuantity] = useState<number>(10);
  const [reason, setReason] = useState("Daily fresh morning batch received from plant");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();

      // Fetch all inventory items with associated product details
      const { data: invData, error } = await supabase
        .from("inventory")
        .select("*, products(id, name, name_hi, category_key, base_price, unit, is_published)")
        .order("current_stock", { ascending: true });

      if (invData) setInventoryList(invData);

      // Fetch latest 30 transactions
      const { data: txData } = await supabase
        .from("inventory_transactions")
        .select("*, products(name)")
        .order("created_at", { ascending: false })
        .limit(30);

      if (txData) setTransactions(txData);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdjustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await adjustStock(
        selectedProduct.product_id,
        Number(deltaQuantity),
        adjustmentType,
        reason,
        notes
      );

      setStatusMessage({
        type: "success",
        text: `Stock for "${selectedProduct.products?.name}" adjusted successfully!`,
      });
      setSelectedProduct(null);
      await fetchInventory();
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Failed to adjust stock.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredInventory = inventoryList.filter((item) => {
    const p = item.products;
    if (!p) return false;
    const q = searchQuery.toLowerCase();
    const matchesQ = !q || p.name.toLowerCase().includes(q) || (p.name_hi && p.name_hi.includes(q));
    const matchesStatus = filterStatus === "all" || item.stock_status === filterStatus;
    return matchesQ && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Live Stock & Inventory Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Auto-Synced to Storefront
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time batch tracking, low-stock alerts, and permanent audit log of all quantity modifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchInventory}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
            title="Refresh Inventory"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
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

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stock by product name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filterStatus === "all"
                ? "bg-[#0B2A6F] text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setFilterStatus("in_stock")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filterStatus === "in_stock"
                ? "bg-emerald-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            In Stock
          </button>
          <button
            onClick={() => setFilterStatus("low_stock")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filterStatus === "low_stock"
                ? "bg-amber-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Low Stock Alerts
          </button>
          <button
            onClick={() => setFilterStatus("out_of_stock")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filterStatus === "out_of_stock"
                ? "bg-red-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Out of Stock
          </button>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Dairy Product</th>
                <th className="py-3.5 px-4 font-semibold">Current Count</th>
                <th className="py-3.5 px-4 font-semibold">Threshold Alert</th>
                <th className="py-3.5 px-4 font-semibold">Calculated Status</th>
                <th className="py-3.5 px-4 font-semibold">Last Adjusted</th>
                <th className="py-3.5 px-4 font-semibold text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInventory.map((item) => {
                const p = item.products;
                const status = item.stock_status;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{p?.name}</div>
                      <div className="text-[11px] text-slate-500">{p?.name_hi || p?.category_key}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-base font-bold text-slate-900">
                        {item.current_stock}
                      </span>{" "}
                      <span className="text-xs text-slate-500">{item.unit || "units"}</span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      ≤ {item.minimum_threshold} {item.unit || "units"}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          status === "in_stock"
                            ? "bg-emerald-100 text-emerald-800"
                            : status === "low_stock"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {status === "in_stock" && <CheckCircle2 className="w-3 h-3" />}
                        {status === "low_stock" && <AlertTriangle className="w-3 h-3" />}
                        {status === "out_of_stock" && <XCircle className="w-3 h-3" />}
                        <span className="capitalize">{status.replace(/_/g, " ")}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {item.last_adjusted_at
                        ? new Date(item.last_adjusted_at).toLocaleDateString()
                        : "Initial Setup"}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedProduct(item);
                          setAdjustmentType("addition");
                          setDeltaQuantity(10);
                          setReason("Fresh morning batch arrived from processing plant");
                        }}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg text-xs transition inline-flex items-center gap-1"
                      >
                        <Boxes className="w-3.5 h-3.5" />
                        <span>Adjust</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADJUSTMENT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Stock Adjustment: {selectedProduct.products?.name}
                </h2>
                <p className="text-xs text-slate-500">
                  Current Stock: {selectedProduct.current_stock} {selectedProduct.unit}
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdjustSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">Adjustment Action</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAdjustmentType("addition")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      adjustmentType === "addition"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Receive / Add Stock</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdjustmentType("reduction")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      adjustmentType === "reduction"
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Minus className="w-3.5 h-3.5" />
                    <span>Sold / Dispatched</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdjustmentType("damage")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      adjustmentType === "damage"
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Spoilage / Damage</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdjustmentType("reconciliation")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      adjustmentType === "reconciliation"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Set Exact Count</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {adjustmentType === "reconciliation" ? "New Exact Stock Count" : "Quantity Change"}
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={deltaQuantity}
                  onChange={(e) => setDeltaQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Reason for Adjustment * (Required for Audit Trail)
                </label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="e.g. Daily morning dispatch, Physical inventory audit"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Internal Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="e.g. Batch #DB-20261002, inspected by quality lab"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#0B2A6F] hover:bg-blue-800 text-white rounded-xl font-medium flex items-center gap-2 transition disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting ? "Recording..." : "Record Adjustment"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transaction History Log Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-slate-600" />
            <h2 className="text-base font-bold text-slate-900">Inventory Movement & Audit History</h2>
          </div>
          <span className="text-xs text-slate-400">Last 30 Records</span>
        </div>

        {transactions.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">No inventory transactions logged yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Date & Time</th>
                  <th className="py-2.5 px-3 font-semibold">Product</th>
                  <th className="py-2.5 px-3 font-semibold">Type</th>
                  <th className="py-2.5 px-3 font-semibold">Change</th>
                  <th className="py-2.5 px-3 font-semibold">Prev → New</th>
                  <th className="py-2.5 px-3 font-semibold">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-2.5 px-3 text-slate-500">
                      {new Date(tx.created_at).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">
                      {tx.products?.name || "Product"}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          tx.adjustment_type === "addition"
                            ? "bg-emerald-100 text-emerald-800"
                            : tx.adjustment_type === "damage"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {tx.adjustment_type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      {tx.adjustment_type === "addition" ? `+${tx.quantity}` : `-${tx.quantity}`}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      {tx.previous_stock} → {tx.new_stock}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 max-w-xs truncate">
                      {tx.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
