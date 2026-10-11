"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Boxes,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Sparkles,
  X,
  Save,
  RefreshCw,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateProduct, createProduct, deleteProduct } from "@/lib/supabase/admin";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Edit modal state
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    name_hi: "",
    slug: "",
    category_key: "milk",
    category_label: "Fresh Milk",
    tagline: "",
    short_description: "",
    base_price: 36,
    unit: "500ml pouch",
    fat_spec: "6.0% min",
    snf_spec: "9.0% min",
    shelf_life: "48 hours refrigerated",
    ingredients: "Fresh pure cow & buffalo milk",
    is_available: true,
    is_published: true,
    initial_stock: 50,
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data: prodData, error } = await supabase
        .from("products")
        .select("*, inventory(current_stock, stock_status, minimum_threshold)")
        .order("sort_order", { ascending: true });

      if (prodData) {
        setProducts(prodData);
      }

      const { data: catData } = await supabase
        .from("product_categories")
        .select("*")
        .order("sort_order", { ascending: true });

      if (catData) setCategories(catData);
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSaving(true);
    setStatusMessage(null);

    try {
      await updateProduct(editingProduct.id, {
        name: editingProduct.name,
        name_hi: editingProduct.name_hi,
        category_key: editingProduct.category_key,
        base_price: Number(editingProduct.base_price),
        tagline: editingProduct.tagline,
        short_description: editingProduct.short_description,
        fat_spec: editingProduct.fat_spec,
        snf_spec: editingProduct.snf_spec,
        shelf_life: editingProduct.shelf_life,
        is_available: editingProduct.is_available,
        is_published: editingProduct.is_published,
      });

      setStatusMessage({ type: "success", text: `"${editingProduct.name}" updated successfully!` });
      setEditingProduct(null);
      await fetchProducts();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to update product" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const generatedSlug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      await createProduct(
        {
          name: newProduct.name,
          name_hi: newProduct.name_hi || newProduct.name,
          slug: generatedSlug,
          category_key: newProduct.category_key,
          category_label: newProduct.category_label,
          tagline: newProduct.tagline,
          short_description: newProduct.short_description,
          base_price: Number(newProduct.base_price),
          unit: newProduct.unit,
          fat_spec: newProduct.fat_spec,
          snf_spec: newProduct.snf_spec,
          shelf_life: newProduct.shelf_life,
          ingredients: newProduct.ingredients,
          is_available: newProduct.is_available,
          is_published: newProduct.is_published,
          images: { front: "/images/products/placeholder.jpg" },
        },
        Number(newProduct.initial_stock)
      );

      setStatusMessage({ type: "success", text: `Product "${newProduct.name}" created successfully!` });
      setIsCreateModalOpen(false);
      await fetchProducts();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to create product" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    try {
      await deleteProduct(id);
      setStatusMessage({ type: "success", text: `"${name}" removed from catalog.` });
      await fetchProducts();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to delete product." });
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.category_key === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQ = !q || p.name.toLowerCase().includes(q) || (p.name_hi && p.name_hi.includes(q));
    return matchesCat && matchesQ;
  });

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Product Catalog Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              {products.length} Products
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Control customer-facing prices, product specifications, descriptions, and storefront visibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchProducts}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
            title="Refresh Products"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 bg-[#0B2A6F] hover:bg-blue-800 text-white font-medium rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
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
            placeholder="Search by product name, Hindi name, or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === "all"
                ? "bg-[#0B2A6F] text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.key
                  ? "bg-[#0B2A6F] text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Product</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Base Price</th>
                <th className="py-3.5 px-4 font-semibold">Specs (Fat/SNF)</th>
                <th className="py-3.5 px-4 font-semibold">Stock Status</th>
                <th className="py-3.5 px-4 font-semibold">Visibility</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const inv = Array.isArray(p.inventory) ? p.inventory[0] : p.inventory;
                const currentStock = inv?.current_stock ?? 0;
                const stockStatus = inv?.stock_status ?? "in_stock";

                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    {/* Name & Photo */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 overflow-hidden shrink-0 flex items-center justify-center font-bold text-amber-800 text-xs">
                          🥛
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{p.name}</div>
                          <div className="text-[11px] text-slate-500">{p.name_hi || p.slug}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 capitalize">
                        {p.category_label || p.category_key}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      ₹{p.base_price}
                      <span className="text-[11px] text-slate-400 font-normal ml-1">
                        / {p.unit || "unit"}
                      </span>
                    </td>

                    {/* Specs */}
                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      {p.fat_spec ? (
                        <span>Fat: {p.fat_spec}</span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Stock Status Badge */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            stockStatus === "in_stock"
                              ? "bg-emerald-500"
                              : stockStatus === "low_stock"
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                        />
                        <span className="font-medium text-xs text-slate-800">
                          {currentStock} {p.unit || "units"}
                        </span>
                      </div>
                    </td>

                    {/* Visibility */}
                    <td className="py-3.5 px-4">
                      {p.is_published ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          <Eye className="w-3 h-3" /> Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          <EyeOff className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href="/admin/inventory"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition"
                          title="Manage Stock"
                        >
                          <Boxes className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setEditingProduct({ ...p })}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition"
                          title="Edit Details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Edit Product: {editingProduct.name}</h2>
                <p className="text-xs text-slate-500">Update pricing, description, and specifications</p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Product Name (English)</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Product Name (Hindi)</label>
                  <input
                    type="text"
                    value={editingProduct.name_hi || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name_hi: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Base Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.base_price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, base_price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fat Spec</label>
                  <input
                    type="text"
                    value={editingProduct.fat_spec || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, fat_spec: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    placeholder="e.g. 6.0% min"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">SNF Spec</label>
                  <input
                    type="text"
                    value={editingProduct.snf_spec || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, snf_spec: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    placeholder="e.g. 9.0% min"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingProduct.tagline || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="Short engaging hook"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.short_description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, short_description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Shelf Life</label>
                  <input
                    type="text"
                    value={editingProduct.shelf_life || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, shelf_life: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex items-center gap-6 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.is_available}
                      onChange={(e) => setEditingProduct({ ...editingProduct, is_available: e.target.checked })}
                      className="rounded text-blue-600 w-4 h-4"
                    />
                    <span className="font-semibold text-slate-700">Available to Order</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.is_published}
                      onChange={(e) => setEditingProduct({ ...editingProduct, is_published: e.target.checked })}
                      className="rounded text-blue-600 w-4 h-4"
                    />
                    <span className="font-semibold text-slate-700">Published on Site</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#0B2A6F] hover:bg-blue-800 text-white rounded-xl font-medium flex items-center gap-2 transition disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE PRODUCT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Add New Dairy Product</h2>
                <p className="text-xs text-slate-500">Add a new item to your online dairy storefront</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Product Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    placeholder="e.g. Traditional Fresh Paneer"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Product Name (Hindi)</label>
                  <input
                    type="text"
                    value={newProduct.name_hi}
                    onChange={(e) => setNewProduct({ ...newProduct, name_hi: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    placeholder="e.g. शुद्ध ताज़ा पनीर"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProduct.category_key}
                    onChange={(e) => {
                      const sel = categories.find((c) => c.key === e.target.value);
                      setNewProduct({
                        ...newProduct,
                        category_key: e.target.value,
                        category_label: sel ? sel.label : "Dairy",
                      });
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                  >
                    <option value="milk">Fresh Milk</option>
                    <option value="dahi-chaach">Dahi & Chaach</option>
                    <option value="paneer">Fresh Paneer</option>
                    <option value="ghee">Pure Desi Ghee</option>
                    <option value="khoya">Fresh Khoya / Mawa</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Base Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.base_price}
                    onChange={(e) => setNewProduct({ ...newProduct, base_price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Initial Stock Count</label>
                  <input
                    type="number"
                    value={newProduct.initial_stock}
                    onChange={(e) => setNewProduct({ ...newProduct, initial_stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fat Spec</label>
                  <input
                    type="text"
                    value={newProduct.fat_spec}
                    onChange={(e) => setNewProduct({ ...newProduct, fat_spec: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    placeholder="e.g. 6.0% min"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Shelf Life</label>
                  <input
                    type="text"
                    value={newProduct.shelf_life}
                    onChange={(e) => setNewProduct({ ...newProduct, shelf_life: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    placeholder="e.g. 48 hours refrigerated"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={newProduct.short_description}
                  onChange={(e) => setNewProduct({ ...newProduct, short_description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  placeholder="Daily fresh farm batch with traditional taste..."
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#0B2A6F] hover:bg-blue-800 text-white rounded-xl font-medium flex items-center gap-2 transition disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isSaving ? "Creating..." : "Create Product"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
