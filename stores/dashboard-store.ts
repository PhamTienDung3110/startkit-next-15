/**
 * Dashboard Store - Quản lý filters và view states của Dashboard
 *
 * @module stores/dashboard-store
 * @description Store này quản lý tất cả filters, sorting, và view modes
 * cho Dashboard page. KHÔNG persist vào localStorage vì filters thường
 * reset mỗi lần vào trang.
 *
 * Features:
 * - Category filtering
 * - Date range selection
 * - Search functionality
 * - View mode (grid/list)
 * - Sorting options
 * - Reset all filters
 *
 * ⚠️ CHỈ DÙNG TRONG DASHBOARD (non-SEO page)
 *
 * @example
 * ```tsx
 * "use client"
 * import { useDashboardStore } from "@/stores"
 *
 * export function DashboardFilters() {
 *   const {
 *     selectedCategory,
 *     setCategory,
 *     dateRange,
 *     setDateRange,
 *     resetFilters
 *   } = useDashboardStore()
 *
 *   return (
 *     <div>
 *       <select value={selectedCategory} onChange={(e) => setCategory(e.target.value)}>
 *         <option value="all">All</option>
 *         <option value="active">Active</option>
 *       </select>
 *       <button onClick={resetFilters}>Reset</button>
 *     </div>
 *   )
 * }
 * ```
 */

import { create } from "zustand";

/**
 * Date Range Interface
 * Định nghĩa khoảng thời gian (từ ngày nào đến ngày nào)
 */
interface DateRange {
  /** Ngày bắt đầu */
  from: Date | null;
  /** Ngày kết thúc */
  to: Date | null;
}

/**
 * Dashboard State Interface
 * Định nghĩa tất cả states và actions cho Dashboard
 */
interface DashboardState {
  // Filters
  /** Category được chọn (all, active, archived, etc.) */
  selectedCategory: string;
  /** Khoảng thời gian filter */
  dateRange: DateRange;
  /** Từ khóa tìm kiếm */
  searchQuery: string;

  // View states
  /** Chế độ hiển thị - grid hoặc list */
  viewMode: "grid" | "list";
  /** Sắp xếp theo - date, name, hoặc status */
  sortBy: "date" | "name" | "status";

  // Actions
  /** Set category filter */
  setCategory: (category: string) => void;
  /** Set date range filter */
  setDateRange: (range: DateRange) => void;
  /** Set search query */
  setSearchQuery: (query: string) => void;
  /** Chuyển đổi view mode */
  setViewMode: (mode: "grid" | "list") => void;
  /** Thay đổi sorting */
  setSortBy: (sort: "date" | "name" | "status") => void;
  /** Reset tất cả filters về default */
  resetFilters: () => void;
}

/**
 * Dashboard Store
 * Store chính cho Dashboard page
 *
 * Note: KHÔNG persist vào localStorage
 * Filters thường reset mỗi lần vào trang cho UX tốt hơn
 */
export const useDashboardStore = create<DashboardState>((set) => ({
  // Initial states (default values)
  selectedCategory: "all", // Hiển thị tất cả
  dateRange: { from: null, to: null }, // Không filter theo date
  searchQuery: "", // Không có search query
  viewMode: "grid", // Default view mode
  sortBy: "date", // Sort theo date mới nhất

  // Actions - các function để update state
  setCategory: (category) => set({ selectedCategory: category }),
  setDateRange: (range) => set({ dateRange: range }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSortBy: (sort) => set({ sortBy: sort }),

  // Reset về initial state
  resetFilters: () =>
    set({
      selectedCategory: "all",
      dateRange: { from: null, to: null },
      searchQuery: "",
    }),
}));
