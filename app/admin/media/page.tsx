"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  UploadCloud,
  Folder,
  Trash2,
  Copy,
  Check,
  Search,
  RefreshCw,
  ExternalLink,
  Plus,
  X,
  FileVideo,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminMediaLibraryPage() {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("media_library")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setMediaList(data);
    } catch (err) {
      console.error("Failed to load media items:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setStatusMessage(null);

    const supabase = createClient();
    let uploadedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const folder = selectedFolder === "all" ? "general" : selectedFolder;
      const fileExt = file.name.split(".").pop();
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
      const filePath = `${folder}/${Date.now()}_${cleanFileName}.${fileExt}`;

      try {
        // 1. Upload to Supabase Storage Bucket 'media'
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("media")
          .upload(filePath, file, { cacheControl: "3600", upsert: true });

        if (uploadError) throw uploadError;

        // 2. Retrieve public URL
        const { data: urlData } = supabase.storage.from("media").getPublicUrl(filePath);

        // 3. Register in media_library table
        const { data: ws } = await supabase.from("websites").select("id").limit(1).single();

        await supabase.from("media_library").insert({
          website_id: ws?.id || null,
          file_name: file.name,
          storage_path: filePath,
          public_url: urlData.publicUrl,
          file_type: file.type.startsWith("video") ? "video" : "image",
          mime_type: file.type,
          file_size_bytes: file.size,
          folder: folder,
          alt_text: file.name.replace(/\.[^/.]+$/, ""),
        });

        uploadedCount++;
      } catch (err: any) {
        console.error("Error uploading file:", err);
        setStatusMessage({ type: "error", text: `Upload failed: ${err.message}` });
      }
    }

    if (uploadedCount > 0) {
      setStatusMessage({
        type: "success",
        text: `Successfully uploaded ${uploadedCount} file(s) to Supabase Storage!`,
      });
      await fetchMedia();
    }
    setIsUploading(false);
  };

  const handleDelete = async (id: string, storagePath: string) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;
    try {
      const supabase = createClient();
      await supabase.storage.from("media").remove([storagePath]);
      await supabase.from("media_library").delete().eq("id", id);
      setStatusMessage({ type: "success", text: "Media removed successfully." });
      await fetchMedia();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: "Failed to delete media item." });
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const filteredMedia = mediaList.filter((m) => {
    const matchesFolder = selectedFolder === "all" || m.folder === selectedFolder;
    const q = searchQuery.toLowerCase();
    const matchesQ = !q || m.file_name.toLowerCase().includes(q) || (m.alt_text && m.alt_text.toLowerCase().includes(q));
    return matchesFolder && matchesQ;
  });

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Media & Asset Library
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              Supabase Storage
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Store, preview, and organize high-resolution product photography, hero videos, and banners.
          </p>
        </div>

        {/* Upload Button */}
        <div className="flex items-center gap-2">
          <label className="cursor-pointer px-4 py-2.5 bg-[#0B2A6F] hover:bg-blue-800 text-white font-medium rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition">
            <UploadCloud className="w-4 h-4" />
            <span>{isUploading ? "Uploading..." : "Upload Media"}</span>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
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

      {/* Filter and Folder Navigation */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media by filename or alt text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["all", "products", "banners", "general"].map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedFolder === folder
                  ? "bg-[#0B2A6F] text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>{folder}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="text-sm font-medium text-slate-600">No media items in this folder yet.</p>
          <p className="text-xs text-slate-400 mt-1">Upload high-res product photos or video clips above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((m) => (
            <div
              key={m.id}
              className="group bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col"
            >
              {/* Thumbnail */}
              <div className="aspect-square bg-slate-100 relative overflow-hidden flex items-center justify-center">
                {m.file_type === "video" ? (
                  <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                    <FileVideo className="w-10 h-10 text-blue-600 mb-1" />
                    <span className="text-[10px] truncate max-w-full font-mono">{m.file_name}</span>
                  </div>
                ) : (
                  <img
                    src={m.public_url}
                    alt={m.alt_text || m.file_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                )}
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-white font-mono uppercase">
                  {m.folder}
                </span>
              </div>

              {/* Info & Actions */}
              <div className="p-3 flex-1 flex flex-col justify-between gap-2 text-xs">
                <div>
                  <p className="font-semibold text-slate-800 truncate" title={m.file_name}>
                    {m.file_name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {Math.round(m.file_size_bytes / 1024)} KB
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                  <button
                    onClick={() => handleCopyUrl(m.public_url)}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    title="Copy Public URL"
                  >
                    {copiedUrl === m.public_url ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(m.id, m.storage_path)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                    title="Delete Media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
