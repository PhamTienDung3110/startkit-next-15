# 📚 HƯỚNG DẪN CÀI ĐẶT VÀ SỬ DỤNG

## 🎯 Giới thiệu

**StartKit Next.js** - Template hiện đại với Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui và các công nghệ tiên tiến nhất.

---

## 🛠️ Tech Stack

### Core

- **Next.js 15.5.6** - App Router, Server Components, ISR
- **React 19.1.0** - Latest React with RSC
- **TypeScript 5.x** - Strict mode, path aliases (@/\*)

### Styling

- **Tailwind CSS v4.1.15** - `@import "tailwindcss"` syntax mới
- **shadcn/ui** - Radix UI components, copy vào project
- **next-themes** - Dark mode với zero flash
- **CSS Variables** - Theme customization

### Forms & Validation

- **react-hook-form** - Ít re-render, hiệu năng cao
- **zod** - Type-safe validation, infer types
- **@hookform/resolvers** - Tích hợp RHF + Zod

### HTTP & Environment

- **axios** - HTTP client với interceptors
- **zod (env validation)** - Type-safe env vars

### Internationalization

- **next-intl** - i18n cho Next.js 15 App Router
- **Hỗ trợ:** Server & Client Components, ISR, type-safe

### UI & Icons

- **lucide-react** - 1000+ icons, tree-shakeable
- **@tabler/icons-react** - 5000+ icons, stroke-based

### Charts & Tables

- **recharts** - Composable charts, responsive
- **@tanstack/react-table** - Headless table, fully controlled

### Drag & Drop

- **@dnd-kit/core** - Modern DnD, accessible, touch support
- **@dnd-kit/sortable** - Sortable lists/grids
- **@dnd-kit/utilities** - CSS transforms helpers

### State Management

- **zustand 5.x** - Lightweight state management (~1KB)
- **Chỉ cho non-SEO pages** - Dashboard, Admin, Settings

### Code Quality

- **ESLint 9.x** + **Prettier 3.6.2** + **Tailwind plugin**
- Auto format on save, max warnings = 0

---

## 💻 Cài đặt

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build
npm start

# Linting
npm run lint          # Check only
npm run lint:fix      # Auto fix
npm run format        # Prettier format
```

**Requirements:** Node.js >= 18.18.0

---

## 📁 Cấu trúc thư mục

```plaintext
├── app/                    # App Router (Next.js 15)
│   └── [locale]/          # Dynamic locale routing
│       ├── demo/          # Demo components page
│       ├── dashboard/     # Dashboard page
│       │   ├── data.json # Dashboard data
│       │   └── page.tsx  # Dashboard page
│       ├── layout.tsx     # Root layout (với sidebar & header)
│       ├── page.tsx       # Homepage
│       └── globals.css    # Global styles
├── components/
│   ├── forms/             # Form components
│   ├── providers/         # ThemeProvider, etc.
│   └── ui/                # shadcn/ui components (sidebar, collapsible, etc.)
├── constants/             # App constants
│   ├── sidebar.ts        # Sidebar navigation data
│   ├── metadata.ts       # SEO metadata config
│   └── index.ts          # Barrel export
├── stores/               # Zustand state management
│   ├── ui-store.ts      # UI states (sidebar, modals)
│   ├── user-store.ts    # User session & preferences
│   ├── dashboard-store.ts # Dashboard filters
│   └── index.ts         # Barrel export
├── i18n/
│   └── request.ts         # next-intl request config
├── lib/
│   ├── validators/        # Zod schemas
│   └── utils.ts           # cn() helper
├── messages/              # i18n translations
│   ├── vi.json           # Tiếng Việt
│   ├── en.json           # English
│   └── jp.json           # 日本語
├── views/                 # Complex views/pages
│   ├── dashboard/         # Dashboard components
│   │   ├── chart-area-interactive.tsx
│   │   ├── data-table.tsx
│   │   ├── section-cards.tsx
│   │   └── site-header.tsx
│   └── sidebar/           # Sidebar components
│       ├── app-sidebar.tsx      # Main sidebar
│       ├── nav-main.tsx         # Main nav với sub-items
│       ├── nav-documents.tsx    # Documents nav
│       ├── nav-secondary.tsx    # Secondary nav
│       ├── nav-user.tsx         # User menu
│       └── index.tsx            # Barrel export
├── public/                # Static files
├── i18n.ts                # Locale config
├── middleware.ts          # next-intl middleware
├── env.mjs                # Type-safe env validation
└── tsconfig.json          # TS config với @/* paths
```

---

## 🚀 Phát triển

### 1. Icons

**Lucide (default):**

```tsx
import { Moon, Sun, Check } from "lucide-react";
<Moon className="h-5 w-5" />;
```

**Tabler Icons:**

```bash
npm install @tabler/icons-react
```

```json
// tsconfig.json
{ "compilerOptions": { "types": ["@tabler/icons-react"] } }
```

```tsx
import { IconHome, IconUser } from "@tabler/icons-react";
<IconHome size={24} stroke={2} />;
```

### 2. shadcn/ui Components

```bash
npx shadcn@latest add button card dialog input label form table
```

```tsx
import { Button } from "@/components/ui/button";
<Button variant="default">Click</Button>
<Button variant="destructive" size="sm">Delete</Button>
```

### 3. Dark Mode

```tsx
// components/theme-toggle.tsx
"use client";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle</button>;
}
```

**Layout:**

```tsx
// app/layout.tsx
<html suppressHydrationWarning>
  <ThemeProvider attribute="class" defaultTheme="system">
    {children}
  </ThemeProvider>
</html>
```

### 4. Forms với React Hook Form + Zod

**Cấu trúc Validators:**

```plaintext
lib/validators/
├── auth/                    # Authentication validators
│   ├── index.ts            # Barrel export
│   ├── login.ts            # Login form validation
│   ├── register.ts         # Register form validation
│   └── password.ts         # Password utilities & schemas
├── profile.ts              # Profile form validation
└── utils/
    └── form.ts             # Form utilities (error styling, etc.)
```

**Auth Schemas:**

```tsx
// lib/validators/auth/login.ts
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu là bắt buộc").min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  remember: z.boolean().optional().default(false),
});

export type LoginValues = z.infer<typeof LoginSchema>;
```

```tsx
// lib/validators/auth/register.ts
export const RegisterSchema = z.object({
  name: z.string().min(1, "Họ tên là bắt buộc").min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số"),
  confirmPassword: z.string().min(1, "Xác nhận mật khẩu là bắt buộc"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});
```

**Form Utilities:**

```tsx
// lib/utils/form.ts
import { FieldError } from "react-hook-form";

export const getInputClasses = (
  baseClasses: string,
  error?: FieldError,
  errorClasses: string = "border-red-500 focus:border-red-500 focus:ring-red-500"
): string => {
  return `${baseClasses} ${error ? errorClasses : ""}`.trim();
};

export const inputClasses = {
  base: "h-12",
  withIcon: "h-12 pl-10",
  withToggle: "h-12 pr-10 pl-10",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500",
} as const;
```

**Form Implementation:**

```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginValues } from "@/lib/validators/auth";
import { getInputClasses, inputClasses } from "@/lib/utils/form";

export function LoginForm() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", remember: false },
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginValues) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className={getInputClasses(
                    inputClasses.withIcon,
                    form.formState.errors.email
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

**Password Strength Indicator:**

```tsx
import { getPasswordStrength } from "@/lib/validators/auth";

const password = form.watch("password");
const passwordStrength = password ? getPasswordStrength(password) : null;

{passwordStrength && (
  <div className="flex items-center gap-2">
    <div className="flex-1 bg-muted rounded-full h-2">
      <div
        className={`h-2 rounded-full ${
          passwordStrength.score <= 2 ? "bg-red-500" :
          passwordStrength.score <= 4 ? "bg-yellow-500" : "bg-green-500"
        }`}
        style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
      />
    </div>
    <span className={`text-xs ${passwordStrength.color}`}>
      {passwordStrength.label}
    </span>
  </div>
)}
```

**Features:**
- ✅ **Type-safe**: Full TypeScript support với inferred types
- ✅ **Real-time validation**: Validate on blur, submit
- ✅ **Custom error messages**: Vietnamese error messages
- ✅ **Error styling**: Input border đỏ khi có lỗi
- ✅ **Password strength**: Visual strength indicator
- ✅ **Form state management**: Loading, error states
- ✅ **Password visibility toggle**: Show/hide password
- ✅ **Toast notifications**: Success/error feedback
- ✅ **Test-friendly**: data-testid attributes

### 5. Internationalization (i18n) với next-intl

**Cài đặt:**

```bash
npm install next-intl
```

**Cấu trúc thư mục:**

```plaintext
├── i18n.ts                    # Locale config
├── middleware.ts              # Routing middleware
├── i18n/
│   └── request.ts            # Request config
├── messages/
│   ├── vi.json               # Tiếng Việt
│   ├── en.json               # English
│   └── jp.json               # 日本語
└── app/
    └── [locale]/             # Dynamic locale route
        ├── layout.tsx
        └── page.tsx
```

**1. Config locales (i18n.ts):**

```tsx
export const locales = ["vi", "en", "jp"] as const;
export const defaultLocale = "vi";

export type Locale = (typeof locales)[number];
```

**2. Setup Middleware (middleware.ts):**

```tsx
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always", // URL luôn có prefix /vi, /en
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

**3. Request Config (i18n/request.ts):**

```tsx
import { getRequestConfig } from "next-intl/server";
import { locales, Locale } from "@/i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as Locale)) {
    locale = "vi";
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
```

**4. Next.js Config (next.config.ts):**

```tsx
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
```

**5. Layout (app/[locale]/layout.tsx):**

```tsx
import { Locale, locales } from "@/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale as string }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
```

**6. Messages (messages/vi.json):**

```json
{
  "Home": {
    "welcome": "Chào mừng đến với Quản lý tài chính cá nhân",
    "description": "Theo dõi thu chi và mục tiêu của bạn dễ dàng."
  },
  "Dashboard": {
    "balance": "Số dư hiện tại",
    "transactions": "Giao dịch gần đây"
  }
}
```

**7. Sử dụng trong Server Component:**

```tsx
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
```

**8. Sử dụng trong Client Component:**

```tsx
"use client";
import { useTranslations } from "next-intl";

export function WelcomeCard() {
  const t = useTranslations("Home");

  return <div>{t("welcome")}</div>;
}
```

**9. Navigation với locale:**

```tsx
import { Link } from "@/i18n/routing"; // Hoặc next/link với prefix

// next/link (thủ công)
<Link href="/vi/dashboard">Dashboard</Link>;

// useRouter với locale
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/dashboard"); // Tự động thêm locale prefix
```

**10. Chuyển đổi ngôn ngữ:**

```tsx
"use client";
import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/i18n";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale; // Thay locale
    router.push(segments.join("/"));
  };

  return (
    <select onChange={(e) => switchLocale(e.target.value)}>
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
```

**📌 Lưu ý:**

- ✅ **App Router only** - next-intl v3+ chỉ hỗ trợ App Router
- ✅ **ISR support** - Messages được cache tự động
- ✅ **Type-safe** - TypeScript infer keys từ JSON
- ✅ **SEO-friendly** - Mỗi locale có URL riêng (`/vi`, `/en`, `/jp`)
- ✅ **Server & Client** - `useTranslations()` hoạt động ở cả 2 nơi

### 6. HTTP Client với Axios

```bash
npm install axios
```

```tsx
// lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) window.location.href = "/login";
    return Promise.reject(error);
  },
);
```

**Usage:**

```tsx
"use client";
import { api } from "@/lib/axios";

const { data } = await api.get("/users");
```

### 7. Environment Variables (Type-safe)

```tsx
// env.mjs
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Invalid env:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
```

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your-secret-key-min-32-chars
```

**Usage:**

```tsx
import { env } from "@/env.mjs";
const url = env.NEXT_PUBLIC_API_URL; // ✅ Type-safe
```

### 8. Charts với Recharts

```bash
npm install recharts
```

```tsx
"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
];

export function Chart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### 9. Data Tables với TanStack Table

```bash
npm install @tanstack/react-table
```

```tsx
"use client";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";

interface User {
  id: string;
  name: string;
  email: string;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];

export function DataTable({ data }: { data: User[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### 10. Sidebar với shadcn/ui

**Cài đặt Collapsible:**

```bash
npx shadcn@latest add collapsible
```

**Cấu trúc Sidebar:**

```plaintext
views/sidebar/
├── app-sidebar.tsx       # Main sidebar component
├── nav-main.tsx          # Main navigation (có sub-items)
├── nav-documents.tsx     # Documents navigation
├── nav-secondary.tsx     # Secondary navigation
├── nav-user.tsx          # User profile menu
└── index.tsx            # Barrel export

constants/
└── sidebar.ts           # Sidebar data (menu items, user, etc.)
```

**Data Constants (constants/sidebar.ts):**

```tsx
import {
  IconDashboard,
  IconListDetails,
  IconChartBar,
  // ... other icons
} from "@tabler/icons-react";

export const sidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
      isActive: true,
      items: [
        { title: "Overview", url: "#" },
        { title: "Analytics", url: "#" },
        { title: "Reports", url: "#" },
      ],
    },
    // ... more items
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: IconSettings },
    { title: "Get Help", url: "#", icon: IconHelp },
  ],
};
```

**Usage trong Layout:**

```tsx
// app/[locale]/layout.tsx
import { AppSidebar } from "@/views/sidebar";
import { SiteHeader } from "@/views/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function RootLayout({ children, params }) {
  return (
    <html>
      <body>
        <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
```

**Nav với Sub-items (nav-main.tsx):**

```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { IconChevronRight } from "@tabler/icons-react";

export function NavMain({ items }) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <Collapsible key={item.title} defaultOpen={item.isActive}>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                {item.items && <IconChevronRight className="ml-auto" />}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            {item.items && (
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>{subItem.title}</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            )}
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
}
```

**📌 Lưu ý:**

- ✅ **Font size** - Sidebar sử dụng font size 15px cho dễ đọc
- ✅ **Collapsible** - Items có thể mở/đóng với animation mượt
- ✅ **Centralized Data** - Tất cả data trong `constants/sidebar.ts`
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Responsive** - Tự động chuyển sang mobile drawer

### 11. State Management với Zustand

Zustand đã được cài sẵn trong project.

⚠️ **Chỉ dùng cho non-SEO pages** (Dashboard/Admin)

**Sử dụng cho:**

- UI state (sidebar, modals, theme)
- User preferences & session
- Dashboard filters & view modes

**Stores có sẵn:**

```plaintext
stores/
├── ui-store.ts         # Sidebar, modals, UI states
├── user-store.ts       # User session, preferences
└── dashboard-store.ts  # Dashboard filters, sorting
```

**Example - UI Store:**

```tsx
"use client";
import { useUIStore } from "@/stores";

export function MySidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <aside className={sidebarCollapsed ? "collapsed" : "expanded"}>
      <button onClick={toggleSidebar}>Toggle</button>
    </aside>
  );
}
```

**Example - Dashboard Store:**

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

**📌 Rule quan trọng:**

- ✅ **Dashboard, Settings, Admin** → Zustand OK
- ❌ **Homepage, Blog, Product** → Server Component + fetch() (cho SEO)
- 💡 **Tại sao?** SEO pages cần HTML đầy đủ ngay từ đầu cho Google bot

### 12. Drag & Drop với dnd-kit

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

```tsx
"use client";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export function SortableList() {
  const [items, setItems] = useState(["1", "2", "3"]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item} id={item}>
            Item {item}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}
```

---

## 🏗️ Build & Deploy

### Vercel (Khuyến nghị)

1. Push code lên Git
2. Import vào [vercel.com](https://vercel.com)
3. Auto deploy

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔧 Troubleshooting

```bash
# Port in use
PORT=3001 npm run dev

# Clear cache
rm -rf .next node_modules package-lock.json
npm install

# Type check
npx tsc --noEmit

# Fix linting
npm run lint:fix
```

### 13. Testing với Playwright

**Cài đặt:**

```bash
npm install -D @playwright/test
npx playwright install
```

**Configuration (`playwright.config.ts`):**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['json', { outputFile: 'test-results/results.json' }]],
  
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Test Examples:**

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/vi/login');
    
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should show validation errors', async ({ page }) => {
    await page.goto('/vi/login');
    
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
  });
});
```

**Scripts:**

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:report": "playwright show-report"
  }
}
```

### 14. Best Practices

**✅ Do's:**
- **Use TypeScript strict mode**: Enable strict type checking
- **Modular structure**: Organize code by features, not file types
- **Consistent naming**: Use descriptive names for components, functions
- **Error boundaries**: Implement proper error handling
- **Accessibility**: Add proper ARIA attributes, semantic HTML
- **Performance**: Use React.memo, useMemo, useCallback when needed
- **SEO**: Use Server Components for public pages
- **Testing**: Add data-testid attributes for E2E testing

**❌ Don'ts:**
- **Don't mix concerns**: Keep auth, profile, etc. separate
- **Don't skip validation**: Always validate user input
- **Don't hardcode strings**: Use i18n for all user-facing text
- **Don't ignore TypeScript errors**: Fix all type issues
- **Don't use client components unnecessarily**: Prefer Server Components
- **Don't forget error handling**: Always handle async operations
- **Don't skip accessibility**: Make apps usable for everyone

**Code Organization:**

```plaintext
components/
├── ui/                    # Reusable UI components
├── forms/                 # Form-specific components
├── layouts/              # Layout components
└── providers/            # Context providers

lib/
├── validators/           # Zod schemas
│   ├── auth/            # Auth-related validators
│   └── profile.ts       # Profile validators
├── utils/               # Utility functions
│   ├── form.ts         # Form utilities
│   └── cn.ts           # Class name utilities
└── api/                # API utilities
    └── client.ts       # HTTP client

stores/                 # Zustand stores
├── ui-store.ts        # UI state
├── user-store.ts      # User state
└── index.ts          # Barrel export

views/                 # Complex page components
├── dashboard/         # Dashboard views
└── sidebar/          # Sidebar components
```

---

## 📚 Tài liệu tham khảo

**Core Framework:**

- [Next.js](https://nextjs.org/docs) | [React](https://react.dev) | [TypeScript](https://typescriptlang.org)

**Styling & UI:**

- [Tailwind CSS v4](https://tailwindcss.com) | [shadcn/ui](https://ui.shadcn.com)
- [Lucide](https://lucide.dev) | [Tabler Icons](https://tabler.io/icons) | [Radix UI](https://radix-ui.com)

**Data & Visualization:**

- [Recharts](https://recharts.org) | [TanStack Table](https://tanstack.com/table)
- [dnd kit](https://docs.dndkit.com)

**Forms & HTTP:**

- [Axios](https://axios-http.com) | [React Hook Form](https://react-hook-form.com) | [Zod](https://zod.dev)

**i18n:**

- [next-intl](https://next-intl-docs.vercel.app)

---

## 📝 Notes

- ✅ **App Router** (Next.js 15), không phải Pages Router
- ✅ **Tailwind v4** với `@import "tailwindcss"`
- ✅ **TypeScript strict mode** với path aliases `@/*`
- ✅ **next-themes** với `suppressHydrationWarning`
- ✅ **ESLint max warnings = 0**
- ✅ **shadcn/ui** copy components, không install từ npm
- ✅ **next-intl** - i18n với App Router, hỗ trợ 3 ngôn ngữ (vi, en, jp)
- ✅ **Locale routing** - URL format: `/vi/*`, `/en/*`, `/jp/*`
- ✅ **Sidebar** - shadcn/ui sidebar với collapsible sub-items (font 15px)
- ✅ **Constants** - Centralized data trong `constants/`
- ✅ **Zustand** - State management cho non-SEO pages (Dashboard/Admin)
- ✅ **Clean Architecture** - Tách biệt views/sidebar & views/dashboard
- ✅ **React Hook Form + Zod** - Form validation với error styling
- ✅ **Playwright** - E2E testing với multi-browser support
- ✅ **Form Utilities** - Reusable error styling và validation helpers
- ✅ **Modular Validators** - Auth schemas tách riêng từng file
- ✅ **Error Styling** - Input border đỏ khi validation fails
- ✅ **Password Strength** - Visual strength indicator
- ✅ **Toast Notifications** - Success/error feedback
- ✅ **Test-friendly** - data-testid attributes cho E2E testing
- ✅ Xem demo: `npm run dev` → `http://localhost:3000/vi` hoặc `/en`, `/jp`

**Version:** 2.0.0  
**Last Updated:** 2025-01-23
