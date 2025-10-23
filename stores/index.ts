/**
 * Stores Barrel Export
 *
 * @module stores
 * @description Export tất cả stores để import dễ dàng
 *
 * @example
 * ```tsx
 * import { useUIStore, useUserStore, useDashboardStore } from "@/stores"
 * ```
 */

// UI Store - Sidebar, modals, UI states
export { useUIStore } from "./ui-store";

// User Store - User session, preferences
export { useUserStore } from "./user-store";

// Dashboard Store - Dashboard filters, view modes
export { useDashboardStore } from "./dashboard-store";
