/**
 * App Layout - Layout cho các pages có sidebar và header
 *
 * @description Layout cho dashboard, demo và các pages chính
 * - Có Sidebar + Header + Footer
 * - Sử dụng SidebarProvider
 * - Responsive design
 *
 * Structure:
 * SidebarProvider → AppSidebar + SidebarInset → SiteHeader + {children}
 */

import { AppSidebar } from "@/views/sidebar";
import { SiteHeader } from "@/views/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)", // 288px (72 * 4px)
          "--header-height": "calc(var(--spacing) * 12)", // 48px (12 * 4px)
        } as React.CSSProperties
      }
    >
      {/* Global Sidebar - Hiển thị trên tất cả pages */}
      <AppSidebar variant="inset" />

      {/* Main Content Area */}
      <SidebarInset>
        {/* Global Header - Hiển thị trên tất cả pages */}
        <SiteHeader />

        {/* Page Content - Render từng page cụ thể */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
