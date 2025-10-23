/**
 * Main Navigation Component
 *
 * @description Navigation chính của sidebar với collapsible sub-items
 * - Support multi-level menu (parent + children)
 * - Collapsible với animation mượt
 * - Icon chevron rotate khi mở/đóng
 * - Auto-detect active route và highlight
 * - Quick Create button ở top
 *
 * Data source: constants/sidebar.ts (sidebarData.navMain)
 */

"use client";

import { IconChevronRight, IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

/**
 * NavMain Props
 *
 * @param items - Array navigation items
 * @param items[].title - Tên menu item
 * @param items[].url - Link URL
 * @param items[].icon - Icon component (optional)
 * @param items[].isActive - Mở mặc định khi load (optional)
 * @param items[].items - Sub-items array (optional)
 */
export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  // Lấy pathname hiện tại để detect active route
  // pathname = "/vi/dashboard" hoặc "/en/dashboard", etc.
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* Quick Action Buttons */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            {/* Quick Create Button - Primary CTA */}
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>

            {/* Inbox Button - Secondary action */}
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Main Navigation Items - với Collapsible sub-items */}
        <SidebarMenu>
          {items.map((item) => {
            // Check active: pathname bao gồm item.url
            // VD: pathname="/vi/dashboard" includes "/dashboard" → active
            const isActive = pathname.includes(item.url) && item.url !== "#";

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive || isActive} // Mở nếu isActive hoặc đang active
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  {/* Parent Item - Clickable để mở/đóng sub-items */}
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} isActive={isActive}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      {/* Chevron icon - rotate 90° khi mở */}
                      {item.items && (
                        <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {/* Sub-items - Chỉ render nếu có items */}
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          // Check active cho sub-item
                          const isSubActive = pathname.includes(subItem.url) && subItem.url !== "#";

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={isSubActive}>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
