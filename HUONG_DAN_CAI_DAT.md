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
│   ├── demo/              # Demo components page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── forms/             # Form components
│   ├── providers/         # ThemeProvider, etc.
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── validators/        # Zod schemas
│   └── utils.ts           # cn() helper
├── views/                 # Complex views/pages
│   └── dashboard/         # Dashboard components
├── public/                # Static files
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

**Schema:**

```tsx
// lib/validators/profile.ts
import { z } from "zod";
export const ProfileSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
});
export type ProfileValues = z.infer<typeof ProfileSchema>;
```

**Form:**

```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function DemoForm() {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(ProfileSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "" },
  });

  async function onSubmit(values: ProfileValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Lưu</Button>
      </form>
    </Form>
  );
}
```

### 5. HTTP Client với Axios

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

### 6. Environment Variables (Type-safe)

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

### 7. Charts với Recharts

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

### 8. Data Tables với TanStack Table

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

### 9. Drag & Drop với dnd-kit

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

---

## 📚 Tài liệu

### Core

- [Next.js](https://nextjs.org/docs) | [React](https://react.dev) | [TypeScript](https://typescriptlang.org)

### Styling

- [Tailwind CSS v4](https://tailwindcss.com) | [shadcn/ui](https://ui.shadcn.com)

### Icons & UI

- [Lucide](https://lucide.dev) | [Tabler Icons](https://tabler.io/icons) | [Radix UI](https://radix-ui.com)

### Charts & Tables

- [Recharts](https://recharts.org) | [TanStack Table](https://tanstack.com/table)

### DnD

- [dnd kit](https://docs.dndkit.com)

### Data & Forms

- [Axios](https://axios-http.com) | [React Hook Form](https://react-hook-form.com) | [Zod](https://zod.dev)

---

## 📝 Notes

- ✅ App Router (Next.js 15), không phải Pages Router
- ✅ Tailwind v4 với `@import "tailwindcss"`
- ✅ TypeScript strict mode với path aliases `@/*`
- ✅ `suppressHydrationWarning` bắt buộc cho next-themes
- ✅ ESLint max warnings = 0
- ✅ shadcn/ui copy components, không install từ npm
- ✅ Xem demo: `npm run dev` → `http://localhost:3000/demo`

**Version:** 1.0.0  
**Last Updated:** 2025-01-21
