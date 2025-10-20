# 📚 HƯỚNG DẪN CÀI ĐẶT VÀ SỬ DỤNG

## 📋 Mục lục

1. [Giới thiệu dự án](#giới-thiệu-dự-án)
2. [Công nghệ sử dụng](#công-nghệ-sử-dụng)
3. [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
4. [Cài đặt](#cài-đặt)
5. [Cấu trúc thư mục](#cấu-trúc-thư-mục)
6. [Scripts có sẵn](#scripts-có-sẵn)
7. [Cấu hình chi tiết](#cấu-hình-chi-tiết)
8. [Phát triển](#phát-triển)
9. [Build và Deploy](#build-và-deploy)

---

## 🎯 Giới thiệu dự án

Dự án **sapt3** là một ứng dụng web được xây dựng bằng Next.js với các công nghệ hiện đại nhất. Đây là template chuẩn cho việc phát triển ứng dụng React với TypeScript và Tailwind CSS.

---

## 🛠️ Công nghệ sử dụng

### Frontend Framework & Libraries

- **Next.js 15.5.6** - Framework React với App Router
- **React 19.1.0** - Thư viện UI
- **React DOM 19.1.0** - Rendering engine

### Ngôn ngữ lập trình

- **TypeScript 5.x** - Static typing cho JavaScript
  - Cấu hình strict mode
  - Target: ES2017
  - Module: ESNext với Bundler resolution

### Styling

- **Tailwind CSS v4.1.15** - Utility-first CSS framework (phiên bản mới nhất)
  - Sử dụng cú pháp `@import "tailwindcss"`
  - PostCSS với `@tailwindcss/postcss` plugin
  - Autoprefixer 10.4.21
- **tailwind-merge (^3.3.1)** - Merge Tailwind classes một cách thông minh
- **clsx (^2.1.1)** - Utility để construct className strings
- **class-variance-authority (^0.7.1)** - CVA cho variant-based styling
- **CSS Variables** - Custom properties cho theme
  - Dark mode support tự động
  - Geist fonts integration

### Code Quality & Formatting

#### ESLint 9.x

- `eslint-config-next` - Cấu hình ESLint cho Next.js
- `eslint-config-prettier` - Tích hợp với Prettier
- `@typescript-eslint/eslint-plugin` - Linting cho TypeScript
- `@typescript-eslint/parser` - Parser TypeScript
- `eslint-plugin-react` - Rules cho React
- `eslint-plugin-react-hooks` - Rules cho React Hooks
- `eslint-plugin-jsx-a11y` - Accessibility rules
- `eslint-plugin-import` - Import/export rules

#### Prettier 3.6.2

- `prettier-plugin-tailwindcss` - Tự động sắp xếp class Tailwind
- Cấu hình:
  - Semi: true
  - Single quotes: false
  - Print width: 100
  - Tab width: 2
  - Trailing comma: all

### Build Tools

- **PostCSS 8.5.6** - CSS processing
- **Autoprefixer 10.4.21** - Tự động thêm vendor prefixes

### UI Components & Libraries

- **shadcn/ui (^0.9.5)** - Component library dựa trên Radix UI
  - Cài đặt qua CLI
  - Copy components vào project thay vì install package
  - Radix UI primitives cho accessibility
- **@radix-ui/react-slot (^1.2.3)** - Composition utility từ Radix
- **lucide-react (^0.546.0)** - Icon library với 1000+ icons
  - Tree-shakeable
  - Đồng bộ với Lucide icon set
- **sonner (^2.0.7)** - Toast notification library
  - Đẹp và dễ sử dụng
  - Hỗ trợ dark mode tự động
- **next-themes (^0.4.6)** - Theme management cho Next.js
  - Dark mode switching
  - System preference detection
  - Zero flash on page load

### Fonts

- **Geist & Geist Mono** - Font từ Vercel/Next.js
  - Tự động optimize với `next/font`
  - Subsets: latin

---

## 💻 Yêu cầu hệ thống

### Bắt buộc

- **Node.js**: >= 18.18.0 (khuyến nghị 20.x hoặc mới hơn)
- **npm**, **yarn**, **pnpm** hoặc **bun** - Package manager

### Khuyến nghị

- **Visual Studio Code** với extensions:
  - ESLint
  - Prettier - Code formatter
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features
  - ES7+ React/Redux/React-Native snippets

---

## 📥 Cài đặt

### Bước 1: Clone hoặc download project

```bash
# Nếu từ Git repository
git clone [URL_REPOSITORY]
cd sapt3

# Hoặc giải nén file zip vào thư mục
cd sapt3
```

### Bước 2: Cài đặt dependencies

Chọn một trong các package manager sau:

#### Sử dụng npm (mặc định)

```bash
npm install
```

#### Sử dụng yarn

```bash
yarn install
```

#### Sử dụng pnpm

```bash
pnpm install
```

#### Sử dụng bun

```bash
bun install
```

### Bước 3: Chạy development server

```bash
npm run dev
```

Hoặc với package manager khác:

```bash
yarn dev
# hoặc
pnpm dev
# hoặc
bun dev
```

### Bước 4: Mở trình duyệt

Truy cập [http://localhost:3000](http://localhost:3000) để xem kết quả.

---

## 📁 Cấu trúc thư mục

```plaintext
sapt3/
├── app/                      # App Router directory (Next.js 13+)
│   ├── favicon.ico          # Icon trang web
│   ├── globals.css          # Global styles với Tailwind
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Homepage component
│
├── components/               # React components
│   ├── ui/                  # shadcn/ui components
│   │   └── button.tsx       # Button component (example)
│   ├── providers/           # Context providers
│   │   └── ThemeProvider.tsx
│   └── theme-toggle.tsx     # Theme toggle button
│
├── lib/                      # Utility functions
│   └── utils.ts             # Helper functions (cn, etc.)
│
├── public/                   # Static files
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── .eslintrc.json           # Cấu hình ESLint (legacy format)
├── eslint.config.mjs        # Cấu hình ESLint (flat config)
├── .prettierrc              # Cấu hình Prettier
├── .gitignore               # Git ignore rules
├── components.json          # shadcn/ui configuration
├── next.config.ts           # Cấu hình Next.js
├── next-env.d.ts            # TypeScript declarations cho Next.js
├── postcss.config.mjs       # Cấu hình PostCSS
├── tsconfig.json            # Cấu hình TypeScript
├── package.json             # Dependencies và scripts
├── package-lock.json        # Lock file cho npm
├── README.md                # Documentation (English)
└── HUONG_DAN_CAI_DAT.md     # Hướng dẫn tiếng Việt
```

### Giải thích các thư mục quan trọng

#### `/app` - App Router

- **layout.tsx**: Layout chính của ứng dụng, bao gồm HTML structure và fonts
- **page.tsx**: Trang chủ của website
- **globals.css**: CSS toàn cục với Tailwind imports và CSS variables

#### `/components` - React Components

- **ui/**: Components từ shadcn/ui (Button, Card, Dialog, etc.)
- **providers/**: Context providers (ThemeProvider cho dark mode)
- Các custom components khác của project

#### `/lib` - Utility Functions

- **utils.ts**: Helper functions như `cn()` để merge Tailwind classes
- Các utilities và helpers khác

#### `/public` - Static Assets

- Chứa các file tĩnh như images, icons
- Có thể truy cập trực tiếp qua URL (ví dụ: `/next.svg`)

---

## 🚀 Scripts có sẵn

### `npm run dev`

Chạy ứng dụng ở chế độ development với hot-reload.

- URL: <http://localhost:3000>
- Tự động reload khi có thay đổi code
- Error overlay để debug

### `npm run build`

Build ứng dụng cho production.

- Tối ưu hóa code
- Tree-shaking và code splitting
- Tạo file tĩnh trong `.next/`
- Kiểm tra TypeScript types
- Chạy ESLint

### `npm start`

Chạy ứng dụng đã build ở chế độ production.

⚠️ **Lưu ý**: Phải chạy `npm run build` trước khi dùng lệnh này.

### `npm run lint`

Kiểm tra code với ESLint.

- Check tất cả file `.js`, `.jsx`, `.ts`, `.tsx`
- Max warnings: 0 (không cho phép warnings)
- Báo lỗi nếu có vi phạm quy tắc

### `npm run format`

Format code với Prettier.

- Format tất cả files
- Áp dụng theo cấu hình trong `.prettierrc`
- Tự động sắp xếp Tailwind classes

---

## ⚙️ Cấu hình chi tiết

### TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2017", // JavaScript target version
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true, // Bật strict mode
    "jsx": "preserve", // JSX cho Next.js
    "moduleResolution": "bundler", // Module resolution strategy
    "paths": {
      "@/*": ["./*"] // Path alias
    }
  }
}
```

**Tính năng chính:**

- Strict mode: Kiểm tra type nghiêm ngặt
- Path alias `@/`: Import từ root (ví dụ: `import X from "@/app/..."`)
- Incremental compilation: Build nhanh hơn

### ESLint

Dự án sử dụng 2 config files:

1. **`.eslintrc.json`** (Legacy format):
   - Extends: next/core-web-vitals, eslint:recommended
   - TypeScript support
   - Prettier integration

2. **`eslint.config.mjs`** (Flat config - mới):
   - Next.js compatibility mode
   - Ignore patterns cho build folders

### Prettier (`.prettierrc`)

```json
{
  "semi": true, // Dùng dấu chấm phẩy
  "singleQuote": false, // Dùng double quotes
  "printWidth": 100, // Độ dài dòng tối đa
  "tabWidth": 2, // 2 spaces cho indent
  "trailingComma": "all", // Trailing comma everywhere
  "plugins": ["prettier-plugin-tailwindcss"] // Sắp xếp Tailwind classes
}
```

### Tailwind CSS v4

**`globals.css`:**

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

**Tính năng:**

- Tailwind v4 với cú pháp mới
- CSS Variables cho theme customization
- Dark mode tự động (dựa trên system preference)
- Custom fonts với next/font

### PostCSS (`postcss.config.mjs`)

```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};
```

Simple config chỉ cần Tailwind PostCSS plugin.

### Next.js (`next.config.ts`)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

Hiện tại dùng config mặc định. Có thể thêm:

- Image optimization config
- Environment variables
- Redirects/rewrites
- Headers
- Webpack config

---

## 💡 Phát triển

### Cài đặt UI Libraries

Dự án đã được cài đặt sẵn các thư viện sau. Nếu cần cài lại hoặc thêm mới:

#### 1. Utilities cho Tailwind CSS

```bash
npm install clsx tailwind-merge
npm install class-variance-authority
```

**Sử dụng:**

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
// Sử dụng trong component
import { cn } from "@/lib/utils";

<div className={cn("text-base", isActive && "text-blue-500", className)} />;
```

#### 2. Icon Library

```bash
npm install lucide-react
```

**Sử dụng:**

```tsx
import { Check, X, Moon, Sun } from "lucide-react";

<Moon className="h-5 w-5" />
<Sun className="h-[1.2rem] w-[1.2rem]" />
```

Xem tất cả icons tại: [lucide.dev](https://lucide.dev)

#### 3. shadcn/ui - Component Library

shadcn/ui không phải là package npm thông thường, mà copy components vào project.

**Khởi tạo:**

```bash
npx shadcn@latest init
```

Trả lời các câu hỏi:

- Style: Default
- Base color: Slate (hoặc tùy chọn)
- CSS variables: Yes

**Thêm components:**

```bash
# Thêm button component
npx shadcn@latest add button

# Thêm card component
npx shadcn@latest add card

# Thêm dialog component
npx shadcn@latest add dialog

# Thêm nhiều components cùng lúc
npx shadcn@latest add button card dialog input label
```

**Sử dụng:**

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="sm">Small</Button>
```

**Components có sẵn:**

- Button, Card, Dialog, Alert
- Input, Label, Textarea, Select
- Dropdown, Popover, Tooltip
- Tabs, Accordion, Sheet
- và nhiều hơn...

Xem tất cả: [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)

#### 4. Dark Mode với next-themes

```bash
npm install next-themes
```

**Cài đặt ThemeProvider:**

```tsx
// components/providers/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
```

**Thêm vào layout.tsx:**

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

⚠️ **Quan trọng:** Phải thêm `suppressHydrationWarning` vào `<html>` tag để tránh warning do next-themes thay đổi attribute trước khi React hydrate.

**Tạo Theme Toggle Button:**

```tsx
// components/theme-toggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
```

#### 5. Toast Notifications với Sonner

```bash
npm install sonner
```

**Thêm Toaster vào layout:**

```tsx
// app/layout.tsx
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

**Sử dụng:**

```tsx
"use client";

import { toast } from "sonner";

// Success toast
toast.success("Event has been created");

// Error toast
toast.error("Something went wrong");

// Custom toast
toast("Event has been created", {
  description: "Sunday, December 03, 2023 at 9:00 AM",
  action: {
    label: "Undo",
    onClick: () => console.log("Undo"),
  },
});

// Promise toast
toast.promise(promise, {
  loading: "Loading...",
  success: "Success!",
  error: "Error!",
});
```

### Tạo page mới

1. Tạo folder trong `/app`
2. Thêm file `page.tsx`

```typescript
// app/about/page.tsx
export default function AboutPage() {
  return <div>About Page</div>;
}
```

Truy cập: `http://localhost:3000/about`

### Tạo component

1. Tạo folder `components` (hoặc trong `/app`)
2. Tạo component file

```typescript
// components/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      {children}
    </button>
  );
}
```

### Sử dụng Tailwind CSS

Tailwind v4 có cú pháp mới nhưng vẫn dùng utility classes như trước:

```tsx
<div className="flex items-center justify-center bg-gray-100 p-4">
  <h1 className="text-2xl font-bold text-gray-900">Hello World</h1>
</div>
```

### Dark Mode

Dự án sử dụng `next-themes` để quản lý dark mode với đầy đủ tính năng:

**CSS Variables (globals.css):**

```css
/* Tự động chuyển sang dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

**Dùng Tailwind `dark:` modifier:**

```tsx
<div className="bg-white text-black dark:bg-black dark:text-white">Content</div>
```

**Dùng next-themes hook:**

```tsx
"use client";

import { useTheme } from "next-themes";

export function MyComponent() {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("system")}>System</button>
    </div>
  );
}
```

**Tính năng:**

- Light / Dark / System mode
- Tự động phát hiện system preference
- Lưu preference vào localStorage
- Zero flash on page load (với `suppressHydrationWarning`)

### Sử dụng Images

```tsx
import Image from "next/image";

<Image
  src="/my-image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority // Tải trước cho images quan trọng
/>;
```

### API Routes

Tạo file `route.ts` trong `/app/api`:

```typescript
// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}
```

### Environment Variables

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
```

**Lưu ý:**

- `NEXT_PUBLIC_*`: Có thể dùng ở client-side
- Không có prefix: Chỉ dùng ở server-side

---

## 🏗️ Build và Deploy

### Build cho production

```bash
npm run build
```

Output:

- `.next/` folder chứa production build
- Tối ưu hóa tự động
- Static generation khi có thể

### Test production build locally

```bash
npm run build
npm start
```

### Deploy lên Vercel (Khuyến nghị)

1. Push code lên Git (GitHub, GitLab, Bitbucket)
2. Truy cập [vercel.com](https://vercel.com)
3. Import repository
4. Vercel tự động detect Next.js và deploy

### Deploy lên các platform khác

#### Docker

Tạo `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

#### Node.js Server

Cần Node.js runtime trên server:

```bash
npm ci --production
npm run build
npm start
```

---

## 🔧 Troubleshooting

### Port 3000 đã được sử dụng

```bash
# Đổi sang port khác
PORT=3001 npm run dev
```

### Dependencies issues

```bash
# Xóa node_modules và reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### TypeScript errors

```bash
# Check types
npx tsc --noEmit
```

### ESLint errors

```bash
# Fix tự động
npm run lint -- --fix
```

---

## 📚 Tài liệu tham khảo

### Framework & Core

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### CSS & Styling

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- [clsx](https://github.com/lukeed/clsx)
- [CVA - Class Variance Authority](https://cva.style/docs)

### UI Components

- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Lucide Icons](https://lucide.dev)

### Features

- [next-themes Documentation](https://github.com/pacocoursey/next-themes)
- [Sonner Toast](https://sonner.emilkowal.ski/)

### Deployment

- [Vercel Deployment](https://vercel.com/docs)

---

## 📝 Notes

- Dự án sử dụng **App Router** (Next.js 13+), không phải Pages Router
- Tailwind CSS v4 có cú pháp mới với `@import "tailwindcss"`
- ESLint max warnings = 0, phải fix hết warnings trước khi commit
- Prettier tự động format khi save (nếu cài extension)
- Dark mode hoạt động tự động theo system preference
- **suppressHydrationWarning**: Bắt buộc thêm vào `<html>` tag khi dùng next-themes để tránh hydration warning

  ```tsx
  <html lang="en" suppressHydrationWarning>
  ```

- shadcn/ui components được copy vào project, không phải install từ npm
- Sử dụng `cn()` utility để merge Tailwind classes một cách thông minh

---

## 🤝 Support

Nếu gặp vấn đề, hãy:

1. Kiểm tra Console log trong browser (F12)
2. Kiểm tra Terminal output
3. Xem lại các bước cài đặt
4. Đọc error messages cẩn thận
5. Search error trên Google hoặc StackOverflow

---

**Version:** 1.0.0  
**Last Updated:** 2025-01-20
