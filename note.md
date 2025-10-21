# 📝 Data Fetching & SEO Strategy

## 🎯 Quy tắc

| Page Type                           | Strategy                          | Tools                 |
| ----------------------------------- | --------------------------------- | --------------------- |
| **Cần SEO** (Landing/Blog/Docs)     | Server Components + fetch() + ISR | Next.js native fetch  |
| **Không cần SEO** (Dashboard/Admin) | Client-side fetching              | React Query + Zustand |

**⚠️ Rule:** Trang SEO tuyệt đối KHÔNG load data chính bằng client fetch!

---

## 🚀 1. Server-side Fetch Helper

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

## 📄 2. SEO Page (Server Component)

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

## ♻️ 3. On-demand Revalidation

### Backend (NestJS)

Sau khi publish, gọi:

```http
POST https://your-site.com/api/revalidate?tag=blog:slug-xyz&secret=YOUR_SECRET
```

### Next.js Route Handler

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

## ⚙️ 4. NestJS Setup

```typescript
// main.ts
app.enableCors({
  origin: ["https://www.yourdomain.com"],
  credentials: true,
});
```

**Caching:** ISR của Next.js đã xử lý, không cần cache phức tạp ở BE.

---

## 🎁 5. Lợi ích SEO

✅ **HTML đầy đủ** ngay TTFB  
✅ **generateMetadata()** → Title, Description, OG tags, JSON-LD  
✅ **ISR** → Fast + Fresh data  
✅ **Tag-based revalidation** → Update có chọn lọc

---

## 📚 Tóm tắt

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
