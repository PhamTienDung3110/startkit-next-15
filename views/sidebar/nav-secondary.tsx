/**
 * Secondary Navigation Component
 * 
 * @description Navigation phụ (Settings, Help, Search)
 * - Thường đặt ở bottom của sidebar (dùng mt-auto)
 * - Single-level menu (không có sub-items)
 * - Auto-detect active route
 * 
 * Data source: constants/sidebar.ts (sidebarData.navSecondary)
 */

"use client";

import * as React from "react";
import { type Icon } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: Icon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  // Lấy pathname để detect active route
  const pathname = usePathname();
  
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            // Check active state
            const isActive = pathname.includes(item.url) && item.url !== "#";
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
