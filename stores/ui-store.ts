/**
 * UI Store - Quản lý UI states (sidebar, modals, etc.)
 *
 * @module stores/ui-store
 * @description Store này quản lý tất cả UI states như sidebar collapse/expand,
 * modal open/close, và các trạng thái UI khác.
 *
 * Features:
 * - Persist vào localStorage (survive page refresh)
 * - Type-safe với TypeScript
 * - Lightweight (~1KB)
 *
 * ⚠️ CHỈ DÙNG TRONG CLIENT COMPONENTS
 *
 * @example
 * ```tsx
 * "use client"
 * import { useUIStore } from "@/stores"
 *
 * export function MySidebar() {
 *   const { sidebarCollapsed, toggleSidebar } = useUIStore()
 *   return <aside className={sidebarCollapsed ? 'w-16' : 'w-64'}>...</aside>
 * }
 * ```
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * UI State Interface
 * Định nghĩa structure của UI store
 */
interface UIState {
  // Sidebar states
  /** Trạng thái sidebar có đang collapsed không */
  sidebarCollapsed: boolean;
  /** Toggle sidebar giữa collapsed và expanded */
  toggleSidebar: () => void;
  /** Set trực tiếp trạng thái sidebar */
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Modal states
  /** Trạng thái modal có đang mở không */
  isModalOpen: boolean;
  /** Mở modal */
  openModal: () => void;
  /** Đóng modal */
  closeModal: () => void;
}

/**
 * UI Store
 * Store chính để quản lý UI states
 *
 * Persist: Data được lưu vào localStorage với key "ui-storage"
 * Khi user refresh page, state vẫn giữ nguyên
 */
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Initial states
      sidebarCollapsed: false,
      isModalOpen: false,

      // Sidebar actions
      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Modal actions
      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),
    }),
    {
      name: "ui-storage", // localStorage key - có thể xem trong DevTools > Application > Local Storage
    },
  ),
);
