import React from "react";
import Link from "next/link";
import {
  Package,
  Boxes,
  Inbox,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus,
  FileEdit,
  Image as ImageIcon,
  History,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient();

  // 1. Fetch products & inventory metrics
  let totalProducts = 9;
  let inStockCount = 7;
  let lowStockCount = 1;
  let outOfStockCount = 1;
  let recentEnquiries: any[] = [];
  let recentStockChanges: any[] = [];
  let recentAuditLogs: any[] = [];

  try {
    const { data: products } = await supabase
      .from("products")
      .select("id, name, is_published, inventory(current_stock, stock_status, minimum_threshold)");

    if (products && products.length > 0) {
      totalProducts = products.length;
      inStockCount = 0;
      lowStockCount = 0;
      outOfStockCount = 0;

      products.forEach((p: any) => {
        const inv = Array.isArray(p.inventory) ? p.inventory[0] : p.inventory;
        if (!inv || inv.stock_status === "in_stock") inStockCount++;
        else if (inv.stock_status === "low_stock") lowStockCount++;
        else outOfStockCount++;
      });
    }

    // 2. Fetch recent enquiries
    const { data: enquiries } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (enquiries) recentEnquiries = enquiries;

    // 3. Fetch recent inventory adjustments
    const { data: invTx } = await supabase
      .from("inventory_transactions")
      .select("*, products(name)")
      .order("created_at", { ascending: false })
      .limit(4);

    if (invTx) recentStockChanges = invTx;

    // 4. Fetch recent audit logs
    const { data: audits } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (audits) recentAuditLogs = audits;
  } catch (err) {
    console.warn("Failed fetching dashboard metrics:", err);
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-[#0B2A6F] to-[#123E9E] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Website Status: Published & Live
            </span>
            <span className="text-xs text-blue-200">Production Mode</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Divyam Operations & CMS Hub
          </h1>
          <p className="text-blue-100 text-sm mt-1 max-w-xl">
            Real-time control center for dairy stock, daily inquiries, catalog pricing, and storefront content updates.
          </p>
        </div>

        {/* Quick actions top bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/inventory"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-xs sm:text-sm flex items-center gap-1.5 border border-white/20 transition"
          >
            <Boxes className="w-4 h-4" />
            <span>Adjust Stock</span>
          </Link>
          <Link
            href="/admin/content"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-xs sm:text-sm flex items-center gap-1.5 border border-white/20 transition"
          >
            <FileEdit className="w-4 h-4" />
            <span>Edit Home</span>
          </Link>
        </div>
      </div>

      {/* METRIC STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Catalog Products</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">{totalProducts}</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>All active in public storefront</span>
          </div>
        </div>

        {/* In Stock */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">In Stock</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-emerald-600">{inStockCount}</div>
          <div className="text-xs text-slate-500 mt-2">
            Ready for instant dispatch
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Low Stock</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-amber-600">{lowStockCount}</div>
          <div className="text-xs text-amber-700 font-medium mt-2 flex items-center gap-1">
            <span>Below safe minimum threshold</span>
          </div>
        </div>

        {/* Enquiries / Leads */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Customer Inquiries</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">{recentEnquiries.length}</div>
          <div className="text-xs text-slate-500 mt-2">
            Recent customer submissions
          </div>
        </div>
      </div>

      {/* TWO COLUMN GRID: RECENT INQUIRIES & RECENT STOCK MOVEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Customer Inquiries</h2>
              <p className="text-xs text-slate-500">Website leads received via online forms</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Inbox className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">No new customer inquiries right now.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[11px] tracking-wider">
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Phone</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 font-medium text-slate-900">{enq.name}</td>
                      <td className="py-3 text-slate-600">{enq.phone}</td>
                      <td className="py-3 text-slate-600 capitalize">{enq.category || "General"}</td>
                      <td className="py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            enq.status === "new"
                              ? "bg-blue-100 text-blue-700"
                              : enq.status === "contacted"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400 text-right text-xs">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions & Recent Inventory Movements */}
        <div className="space-y-6">
          {/* Quick Operations Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Quick Operations
            </h2>
            <div className="space-y-2">
              <Link
                href="/admin/products"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-100 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white text-blue-600 shadow-xs">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Catalog & Prices</div>
                    <div className="text-[11px] text-slate-500">Edit prices, variants & specs</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/admin/inventory"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-100 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white text-emerald-600 shadow-xs">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Stock Reconcile</div>
                    <div className="text-[11px] text-slate-500">Record batch arrival or sales</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/admin/media"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-100 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white text-amber-600 shadow-xs">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Media Library</div>
                    <div className="text-[11px] text-slate-500">Upload product photos & banners</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </div>

          {/* Recent Stock Log */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Recent Stock Moves
              </h2>
              <Link href="/admin/inventory" className="text-xs text-blue-600 hover:underline">
                History
              </Link>
            </div>
            {recentStockChanges.length === 0 ? (
              <p className="text-xs text-slate-400 py-3">No recent inventory adjustments logged.</p>
            ) : (
              <div className="space-y-3">
                {recentStockChanges.map((tx: any) => (
                  <div key={tx.id} className="text-xs border-b border-slate-100 pb-2.5 last:border-none">
                    <div className="flex items-center justify-between font-medium text-slate-800">
                      <span>{tx.products?.name || "Product"}</span>
                      <span
                        className={`font-semibold ${
                          tx.adjustment_type === "addition" ? "text-emerald-600" : "text-amber-600"
                        }`}
                      >
                        {tx.adjustment_type === "addition" ? `+${tx.quantity}` : `-${tx.quantity}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px] mt-0.5">
                      <span>{tx.reason}</span>
                      <span>{new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
