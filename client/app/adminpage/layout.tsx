import AdminNavbar from "@/components/features/adminpage/admin-navbar";
import AdminSidebar from "@/components/features/adminpage/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <React.Fragment>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <AdminNavbar />
          <div className="flex p-5 bg-slate-100">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </React.Fragment>
  );
}
