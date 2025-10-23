# 🗄️ Zustand Stores

## 📂 Cấu trúc

```plaintext
stores/
├── ui-store.ts         # UI states (sidebar, modals)
├── user-store.ts       # User session & preferences
├── dashboard-store.ts  # Dashboard filters & views
└── index.ts           # Barrel export
```

## 🚀 Usage

### 1. UI Store

```tsx
"use client";
import { useUIStore } from "@/stores";

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <aside className={sidebarCollapsed ? "w-16" : "w-64"}>
      <button onClick={toggleSidebar}>Toggle</button>
    </aside>
  );
}
```

### 2. User Store

```tsx
"use client";
import { useUserStore } from "@/stores";

export function UserProfile() {
  const { user, preferences, updatePreferences } = useUserStore();

  return (
    <div>
      <h1>{user?.name}</h1>
      <select
        value={preferences.language}
        onChange={(e) => updatePreferences({ language: e.target.value })}
      >
        <option value="vi">Tiếng Việt</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
```

### 3. Dashboard Store

```tsx
"use client";
import { useDashboardStore } from "@/stores";

export function DashboardFilters() {
  const { selectedCategory, setCategory, resetFilters } = useDashboardStore();

  return (
    <div>
      <select value={selectedCategory} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
      </select>
      <button onClick={resetFilters}>Reset</button>
    </div>
  );
}
```

## ⚠️ Lưu ý

- ✅ **Chỉ dùng trong Client Components** (`"use client"`)
- ✅ **Chỉ cho non-SEO pages** (Dashboard, Settings, Admin)
- ❌ **KHÔNG dùng cho SEO pages** (Homepage, Blog, Product)
- ✅ **Persist với localStorage** (ui-store, user-store)
- ✅ **Type-safe** với TypeScript interfaces
