"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Language } from "@/data/translations";
import { Product } from "@/data/products";

export interface CartItem {
  id: string; // combination of productId and variantId
  productId: string;
  slug: string;
  name: string;
  nameHi: string;
  variantId: string;
  size: string;
  sizeHi: string;
  price: number;
  quantity: number;
  image: string;
  isGhee: boolean;
}

interface AppState {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Wishlist
  wishlist: string[]; // array of product slugs
  toggleWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Search Overlay
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  // Video Modal
  videoModalSrc: string | null;
  openVideoModal: (src: string) => void;
  closeVideoModal: () => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Language
      language: "hi", // Default per brief: Hindi hero voice, English support
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () =>
        set((state) => ({ language: state.language === "en" ? "hi" : "en" })),

      // Cart
      cart: [],
      isCartOpen: false,
      addToCart: (item) => {
        const id = `${item.productId}-${item.variantId}`;
        const existing = get().cart.find((c) => c.id === id);
        let updated: CartItem[];
        if (existing) {
          updated = get().cart.map((c) =>
            c.id === id ? { ...c, quantity: Math.min(50, c.quantity + item.quantity) } : c
          );
        } else {
          updated = [...get().cart, { ...item, id }];
        }
        set({
          cart: updated,
          isCartOpen: true,
          toastMessage: `Added ${item.name} (${item.size}) to cart`
        });
      },
      updateQuantity: (id, qty) => {
        if (qty <= 0) {
          set({ cart: get().cart.filter((c) => c.id !== id) });
        } else {
          set({
            cart: get().cart.map((c) =>
              c.id === id ? { ...c, quantity: Math.min(50, qty) } : c
            )
          });
        }
      },
      removeFromCart: (id) =>
        set({ cart: get().cart.filter((c) => c.id !== id) }),
      clearCart: () => set({ cart: [] }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      // Wishlist
      wishlist: [],
      toggleWishlist: (slug) => {
        const inList = get().wishlist.includes(slug);
        const updated = inList
          ? get().wishlist.filter((s) => s !== slug)
          : [...get().wishlist, slug];
        set({
          wishlist: updated,
          toastMessage: inList ? "Removed from wishlist" : "Saved to wishlist"
        });
      },
      isInWishlist: (slug) => get().wishlist.includes(slug),

      // Quick View
      quickViewProduct: null,
      openQuickView: (product) => set({ quickViewProduct: product }),
      closeQuickView: () => set({ quickViewProduct: null }),

      // Search
      isSearchOpen: false,
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),

      // Video Modal
      videoModalSrc: null,
      openVideoModal: (src) => set({ videoModalSrc: src }),
      closeVideoModal: () => set({ videoModalSrc: null }),

      // Toast
      toastMessage: null,
      showToast: (msg) => set({ toastMessage: msg }),
      clearToast: () => set({ toastMessage: null })
    }),
    {
      name: "divyam_dairy_store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        language: state.language,
        cart: state.cart,
        wishlist: state.wishlist
      })
    }
  )
);
