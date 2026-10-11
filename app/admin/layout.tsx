import React from "react";
import { headers } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin CMS & Store Management | Divyam Dairy",
  description: "Divyam Dairy Products CMS, Inventory, and Store Operations Hub",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // The login page manages its own layout without sidebar
  if (pathname.includes("/admin/login")) {
    return <>{children}</>;
  }

  // Fetch session & profile from Supabase
  let userEmail = "owner@divyamdairy.com";
  let userRole = "owner";
  let userName = "Divyam Admin";

  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      userEmail = user.email || userEmail;
      
      // Fetch role
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .single();

      if (profile) {
        userRole = profile.role || "staff";
        userName = profile.full_name || user.email?.split("@")[0] || "User";
      }
    }
  } catch (err) {
    console.warn("Could not retrieve admin user session:", err);
  }

  return (
    <AdminShell
      userEmail={userEmail}
      userRole={userRole}
      userName={userName}
    >
      {children}
    </AdminShell>
  );
}
