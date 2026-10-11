"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { CheckCircle2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Toast() {
  const { toastMessage, clearToast } = useAppStore();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-auto bg-[#0B2A6F] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-blue-400/20 max-w-md backdrop-blur-md"
          >
            <CheckCircle2 className="w-5 h-5 text-[#F5B921] shrink-0" />
            <p className="text-sm font-medium pr-2 leading-snug">{toastMessage}</p>
            <button
              onClick={clearToast}
              className="text-white/70 hover:text-white p-1 rounded-full transition-colors ml-auto"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
