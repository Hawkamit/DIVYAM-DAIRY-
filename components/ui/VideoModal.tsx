"use client";

import { useAppStore } from "@/lib/store";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function VideoModal() {
  const { videoModalSrc, closeVideoModal, language } = useAppStore();

  if (!videoModalSrc) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div className="absolute inset-0" onClick={closeVideoModal} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-slate-900/80 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white">
              {language === "hi"
                ? "दिव्यम डेयरी प्रोडक्ट्स — हमारी कहानी व प्रक्रिया"
                : "Divyam Dairy Products — Our Commercial Story"}
            </h3>
            <button
              onClick={closeVideoModal}
              className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-black flex items-center justify-center">
            <video
              src={videoModalSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
