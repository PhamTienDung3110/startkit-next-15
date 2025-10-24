/**
 * Sidebar Data Configuration
 *
 * @module constants/sidebar
 * @description Chứa tất cả data cho sidebar navigation:
 * - User info
 * - Main navigation menu (với sub-items)
 * - Cloud services navigation
 * - Secondary navigation
 * - Documents quick links
 *
 * Structure:
 * - Static data (không thay đổi runtime)
 * - Centralized configuration
 * - Icon imports từ @tabler/icons-react
 *
 * Note: Đây là constants, KHÔNG phải state management
 * Nếu cần dynamic data → dùng Zustand store
 *
 * @example
 * ```tsx
 * import { sidebarData } from "@/constants/sidebar"
 *
 * <NavMain items={sidebarData.navMain} />
 * <NavUser user={sidebarData.user} />
 * ```
 */

import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

/**
 * Sidebar Data
 * Object chính chứa tất cả navigation data
 */
export const sidebarData = {
  /**
   * User Info
   * Thông tin user hiển thị trong sidebar footer
   * TODO: Thay bằng real user data từ API/store
   */
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  /**
   * Main Navigation
   * Menu chính của sidebar với collapsible sub-items
   *
   * Properties:
   * - title: Tên menu item
   * - url: Link đến (# = placeholder, thay bằng real routes)
   * - icon: Icon component từ @tabler/icons-react
   * - isActive: true = mở mặc định khi load page
   * - items: Array sub-items (optional)
   */
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard", // TODO: Update với real routes
      icon: IconDashboard,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard", // Main dashboard page
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics", // TODO: Tạo page này
        },
        {
          title: "Reports",
          url: "/dashboard/reports", // TODO: Tạo page này
        },
      ],
    },
    {
      title: "Authentication",
      url: "/(auth)",
      icon: IconListDetails,
      items: [
        {
          title: "Login",
          url: "/login", // TODO: Tạo page này
        },
        {
          title: "Register",
          url: "/register", // TODO: Tạo page này
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],

  /**
   * Cloud Services Navigation
   * Menu cho các cloud services với collapsible sub-items
   *
   * Use case: Proposal management, Document capture, AI Prompts
   * Structure giống navMain nhưng cho cloud-based features
   */
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],

  /**
   * Secondary Navigation
   * Menu phụ thường đặt ở bottom của sidebar
   *
   * Use case: Settings, Help, Search - các functions quan trọng nhưng ít dùng
   * Không có sub-items (single level)
   */
  navSecondary: [
    {
      title: "Settings",
      url: "/settings", // TODO: Tạo settings page
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help", // TODO: Tạo help page hoặc link external
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#", // Search thường mở modal, không navigate
      icon: IconSearch,
    },
  ],

  /**
   * Documents Quick Links
   * Quick access links đến các documents/tools thường dùng
   *
   * Use case: Data Library, Reports, Tools
   * Note: Dùng "name" thay vì "title" (khác với navMain)
   */
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};
