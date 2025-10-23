/**
 * App Sidebar Component
 *
 * @description Main sidebar của app - hiển thị trên tất cả pages
 * - Import data từ constants/sidebar.ts
 * - Sử dụng shadcn/ui Sidebar components
 * - Collapsible offcanvas mode (ẩn khi mobile, slide-out khi desktop)
 * - Font size: 15px (custom)
 *
 * Structure:
 * - SidebarHeader: Logo/Brand
 * - SidebarContent: Navigation menus (Main, Documents, Secondary)
 * - SidebarFooter: User profile
 */

"use client";

import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavDocuments } from "./nav-documents";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { sidebarData } from "@/constants/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Header - Logo/Brand */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content - Navigation menus */}
      <SidebarContent>
        {/* Main Navigation - Dashboard, Lifecycle, Analytics, Projects, Team */}
        <NavMain items={sidebarData.navMain} />

        {/* Documents Quick Links */}
        <NavDocuments items={sidebarData.documents} />

        {/* Secondary Navigation - Settings, Help, Search (mt-auto = stick to bottom) */}
        <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* Footer - User profile */}
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
