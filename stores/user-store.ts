/**
 * User Store - Quản lý user session và preferences
 *
 * @module stores/user-store
 * @description Store này quản lý thông tin user hiện tại và preferences cá nhân.
 * Data được persist vào localStorage để giữ session khi refresh page.
 *
 * Features:
 * - User authentication state
 * - User preferences (theme, language, notifications)
 * - Persist vào localStorage
 * - Type-safe interfaces
 *
 * ⚠️ CHỈ DÙNG CHO NON-SEO PAGES (Dashboard, Profile, Settings)
 *
 * @example
 * ```tsx
 * "use client"
 * import { useUserStore } from "@/stores"
 *
 * export function UserProfile() {
 *   const { user, preferences, updatePreferences } = useUserStore()
 *
 *   return (
 *     <div>
 *       <h1>{user?.name}</h1>
 *       <select
 *         value={preferences.language}
 *         onChange={(e) => updatePreferences({ language: e.target.value })}
 *       >
 *         <option value="vi">Tiếng Việt</option>
 *         <option value="en">English</option>
 *       </select>
 *     </div>
 *   )
 * }
 * ```
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * User Interface
 * Thông tin cơ bản của user
 */
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

/**
 * User Preferences Interface
 * Các tùy chọn cá nhân của user
 */
interface UserPreferences {
  /** Theme mode - light, dark, hoặc theo system */
  theme: "light" | "dark" | "system";
  /** Ngôn ngữ hiển thị - vi, en, hoặc jp */
  language: "vi" | "en" | "jp";
  /** Bật/tắt thông báo */
  notifications: boolean;
}

/**
 * User State Interface
 * Định nghĩa structure của User store
 */
interface UserState {
  /** User hiện tại (null nếu chưa login) */
  user: User | null;
  /** Preferences cá nhân của user */
  preferences: UserPreferences;

  /** Set user sau khi login */
  setUser: (user: User | null) => void;
  /** Cập nhật preferences (partial update) */
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  /** Logout - xóa user khỏi store */
  logout: () => void;
}

/**
 * User Store
 * Store chính để quản lý user session và preferences
 *
 * Persist: Data lưu vào localStorage với key "user-storage"
 * - User info được giữ khi refresh page
 * - Preferences được sync across tabs
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Initial states
      user: null, // Chưa login
      preferences: {
        theme: "system", // Theo system preference
        language: "vi", // Default language
        notifications: true, // Bật thông báo mặc định
      },

      // Actions
      setUser: (user) => set({ user }),

      updatePreferences: (newPreferences) =>
        set((state) => ({
          // Merge preferences cũ với mới
          preferences: { ...state.preferences, ...newPreferences },
        })),

      logout: () => set({ user: null }), // Clear user khi logout
    }),
    {
      name: "user-storage", // localStorage key
    },
  ),
);
