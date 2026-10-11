"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  Boxes,
  FileEdit,
  Image as ImageIcon,
  HelpCircle,
  MessageSquare,
  Truck,
  Inbox,
  Search,
  Settings,
  Users,
  History,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Shield,
  Sparkles
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminShellProps {
  children: React.ReactNode;
  userEmail?: string;
  userRole?: string;
  userName?: string;
}

export function AdminShell({
  children,
  userEmail = "owner@divyam.com",
  userRole = "owner",
  userName = "Owner",
}: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Inventory", href: "/admin/inventory", icon: Boxes },
    { label: "Content Editor", href: "/admin/content", icon: FileEdit },
    { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { label: "Delivery Towns", href: "/admin/services", icon: Truck },
    { label: "Customer Enquiries", href: "/admin/enquiries", icon: Inbox },
    { label: "SEO Metadata", href: "/admin/seo", icon: Search },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
    ...(userRole === "owner" || userRole === "admin"
      ? [
          { label: "Staff & Roles", href: "/admin/staff", icon: Users },
          { label: "Audit Trail", href: "/admin/audit", icon: History },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#0B2A6F] text-white border-b border-blue-900/60 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm">
                <Image
                  src="/images/real/logo.png"
                  alt="Divyam Dairy"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-white text-base tracking-wide flex items-center gap-1.5">
                  Divyam CMS
                  <span className="text-[10px] uppercase font-sans font-extrabold px-1.5 py-0.5 rounded bg-amber-400 text-blue-950">
                    Pro
                  </span>
                </span>
                <span className="text-[10px] text-blue-200 block -mt-0.5">
                  Shri R.S. Enterprises
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live: divyam.com</span>
            </div>

            {/* View site */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-100 hover:text-white hover:bg-white/10 border border-white/15 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Site</span>
            </Link>

            {/* User badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/15">
              <div className="text-right hidden md:block">
                <span className="block text-xs font-semibold text-white leading-tight">
                  {userName}
                </span>
                <span className="text-[10px] text-blue-200 uppercase tracking-wider font-mono">
                  {userRole}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-400 text-blue-950 font-bold text-xs flex items-center justify-center shadow">
                {userName.charAt(0).toUpperCase()}
              </div>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                title="Sign Out"
                className="p-1.5 text-blue-200 hover:text-rose-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Management Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#0B2A6F] text-white shadow-sm"
                      : "text-slate-600 hover:text-[#0B2A6F] hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-amber-300" />}
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-100">
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 mb-1">
                  <Shield className="w-3.5 h-3.5 text-blue-700" />
                  <span>RLS Security Active</span>
                </div>
                <p className="text-[11px] text-blue-700/80 leading-relaxed">
                  All CMS operations are authenticated and audited in PostgreSQL.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl p-5 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0B2A6F] p-1 flex items-center justify-center">
                      <Image
                        src="/images/real/logo.png"
                        alt="Divyam"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-serif font-bold text-[#0B2A6F]">Divyam CMS</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-[#0B2A6F] text-white"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
