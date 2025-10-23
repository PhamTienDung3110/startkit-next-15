# 📝 Project Documentation

## 📁 Project Structure

### Folders Organization

```plaintext
├── app/[locale]/          # Next.js App Router với i18n
│   ├── layout.tsx        # Root layout (sidebar + header global)
│   ├── page.tsx          # Homepage
│   └── dashboard/        # Dashboard pages
│
├── views/                # Complex components & views
│   ├── sidebar/         # Sidebar components
│   │   ├── app-sidebar.tsx
│   │   ├── nav-main.tsx (có sub-items)
│   │   ├── nav-documents.tsx
│   │   ├── nav-secondary.tsx
│   │   └── nav-user.tsx
│   └── dashboard/       # Dashboard-specific components
│       ├── chart-area-interactive.tsx
│       ├── data-table.tsx
│       ├── section-cards.tsx
│       └── site-header.tsx
│
├── constants/           # App-wide constants
│   ├── sidebar.ts      # Sidebar navigation data
│   └── metadata.ts     # SEO metadata config
│
├── stores/             # Zustand state management (non-SEO only)
│   ├── ui-store.ts    # UI states (sidebar, modals)
│   ├── user-store.ts  # User session & preferences
│   └── dashboard-store.ts # Dashboard filters
│
├── components/ui/      # shadcn/ui components
└── lib/validators/     # Zod validation schemas
```

### Design Principles

- **Separation of Concerns:** Sidebar & Dashboard tách riêng
- **Centralized Data:** Constants trong `constants/`
- **Component Reusability:** Barrel exports (`index.tsx`)
- **Type Safety:** Full TypeScript + Zod validation

---

## 📝 Data Fetching & SEO Strategy

### 🎯 Quy tắc

| Page Type                           | Strategy                          | Tools                 |
| ----------------------------------- | --------------------------------- | --------------------- |
| **Cần SEO** (Landing/Blog/Docs)     | Server Components + fetch() + ISR | Next.js native fetch  |
| **Không cần SEO** (Dashboard/Admin) | Client-side fetching              | React Query + Zustand |

**⚠️ Rule:** Trang SEO tuyệt đối KHÔNG load data chính bằng client fetch!

---

### 🚀 1. Server-side Fetch Helper

```tsx
// lib/server-fetch.ts
import "server-only";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export async function apiGet<T>(
  path: string,
  init?: RequestInit & { revalidate?: number; tags?: string[] },
) {
  const { revalidate = 60, tags = [], ...rest } = init || {};
  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: { "Content-Type": "application/json", ...(rest?.headers || {}) },
    next: { revalidate, tags }, // ISR + tag-based revalidate
    // cache: 'force-cache' // SSG nếu cần
  });

  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return (await res.json()) as T;
}
```

---

### 📄 2. SEO Page (Server Component)

```tsx
// app/blog/[slug]/page.tsx
import { apiGet } from "@/lib/server-fetch";

export const revalidate = 120; // Fallback

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await apiGet<{ title: string; content: string }>(`/blog/${params.slug}`, {
    revalidate: 300, // ISR 5 phút
    tags: [`blog:${params.slug}`],
  });

  return (
    <article className="prose">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// SEO Metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await apiGet<{ title: string; description: string }>(`/blog/${params.slug}`);
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}
```

---

### ♻️ 3. On-demand Revalidation

**Backend (NestJS):**

Sau khi publish, gọi:

```http
POST https://your-site.com/api/revalidate?tag=blog:slug-xyz&secret=YOUR_SECRET
```

**Next.js Route Handler:**

```tsx
// app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!tag) return NextResponse.json({ error: "Missing tag" }, { status: 400 });
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}
```

---

### ⚙️ 4. NestJS Setup

```typescript
// main.ts
app.enableCors({
  origin: ["https://www.yourdomain.com"],
  credentials: true,
});
```

**Caching:** ISR của Next.js đã xử lý, không cần cache phức tạp ở BE.

---

### 🎁 5. Lợi ích SEO

✅ **HTML đầy đủ** ngay TTFB  
✅ **generateMetadata()** → Title, Description, OG tags, JSON-LD  
✅ **ISR** → Fast + Fresh data  
✅ **Tag-based revalidation** → Update có chọn lọc

---

### 📚 Tóm tắt

```tsx
// ✅ SEO Page (Server Component)
export default async function Page() {
  const data = await apiGet("/endpoint", { revalidate: 300, tags: ["tag"] });
  return <div>{data.title}</div>;
}

// ✅ Non-SEO Page (Client Component)
("use client");
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data } = useQuery({ queryKey: ["users"], queryFn: () => api.get("/users") });
  return <div>{data}</div>;
}
```

**Key Points:**

- SEO pages: Server Components + ISR
- Dashboard: React Query + Client-side
- Revalidate: On-demand với tags
- Metadata: generateMetadata()

---

## 🗄️ State Management: Zustand vs Fetch

### 🎯 Khi nào dùng gì?

| Scenario                      | Dùng                      | Tại sao                                 |
| ----------------------------- | ------------------------- | --------------------------------------- |
| **Homepage, Blog, Landing**   | ✅ Server `fetch()` + ISR | Google bot cần HTML đầy đủ ngay từ đầu  |
| **Product pages cần SEO**     | ✅ Server `fetch()` + ISR | Meta tags, structured data cho SEO      |
| **Dashboard, Admin panel**    | ✅ Zustand + React Query  | Không cần SEO, ưu tiên UX/performance   |
| **Settings, Profile**         | ✅ Zustand + React Query  | Private pages, không cần index          |
| **UI state (sidebar, modal)** | ✅ Zustand                | Client-only state, không liên quan data |

### ⚠️ Tại sao KHÔNG dùng Zustand cho SEO pages?

#### Problem với Zustand

```tsx
// ❌ BAD: SEO page
"use client"
export default function ProductPage() {
  const products = useProductStore(state => state.products)
  return <div>{products.map(...)}</div>
}

→ HTML ban đầu: <div></div> (empty)
→ Data load sau khi JS chạy
→ Google bot không thấy products
→ Không có meta tags
→ SEO = 0
```

#### Solution với Server fetch

```tsx
// ✅ GOOD: SEO page
export default async function ProductPage() {
  const products = await fetch('/api/products')
  return <div>{products.map(...)}</div>
}

→ HTML ban đầu: <div><h1>Product 1</h1>...</div>
→ Data có sẵn ngay lập tức
→ Google bot thấy toàn bộ content
→ generateMetadata() cho SEO
→ Perfect SEO score
```

### ✅ Khi nào dùng Zustand?

#### 1. Non-SEO pages (Dashboard/Admin)

- Không cần Google index
- Ưu tiên UX, real-time updates
- Client-side filtering, sorting

#### 2. UI State

- Sidebar collapsed/expanded
- Modal open/close
- Theme preferences
- Form wizard steps

#### 3. User Session State

- Current user info
- User preferences
- Shopping cart (nếu không cần persist)
