import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Palette, FileText, Github, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="from-background to-muted/20 min-h-screen bg-gradient-to-b">
      {/* Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6" />
            <span className="text-xl font-bold">StartKit Next.js</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/demo">
              <Button variant="ghost">Demo</Button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
            Next.js Starter Kit
          </h1>
          <p className="text-muted-foreground mb-8 text-xl">
            Template hiện đại với Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui và nhiều hơn
            nữa
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo">
              <Button size="lg" className="gap-2">
                <Palette className="h-5 w-5" />
                Xem Demo
              </Button>
            </Link>
            <Link href="https://github.com" target="_blank">
              <Button size="lg" variant="outline" className="gap-2">
                <Github className="h-5 w-5" />
                GitHub
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-24 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-card rounded-lg border p-6 transition-all hover:shadow-lg">
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <FileText className="text-primary h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Next.js 15</h3>
            <p className="text-muted-foreground text-sm">
              Framework React hiện đại với App Router, Server Components, và tối ưu hóa tự động
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-card rounded-lg border p-6 transition-all hover:shadow-lg">
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <svg
                className="text-primary h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Tailwind CSS v4</h3>
            <p className="text-muted-foreground text-sm">
              Phiên bản mới nhất với cú pháp CSS Variables và dark mode tự động
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-card rounded-lg border p-6 transition-all hover:shadow-lg">
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <svg
                className="text-primary h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold">TypeScript</h3>
            <p className="text-muted-foreground text-sm">
              Type-safe với strict mode, path aliases và full IntelliSense support
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-card rounded-lg border p-6 transition-all hover:shadow-lg">
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Palette className="text-primary h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">shadcn/ui</h3>
            <p className="text-muted-foreground text-sm">
              Thư viện component đẹp dựa trên Radix UI, copy vào project để tùy chỉnh
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-card rounded-lg border p-6 transition-all hover:shadow-lg">
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <svg
                className="text-primary h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold">React Hook Form + Zod</h3>
            <p className="text-muted-foreground text-sm">
              Form validation type-safe với performance cao và UX tốt
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-card rounded-lg border p-6 transition-all hover:shadow-lg">
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <svg
                className="text-primary h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Dark Mode</h3>
            <p className="text-muted-foreground text-sm">
              Theme switcher với next-themes, tự động phát hiện system preference
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mx-auto mt-24 max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Next.js 15",
              "React 19",
              "TypeScript",
              "Tailwind CSS v4",
              "shadcn/ui",
              "React Hook Form",
              "Zod",
              "Lucide Icons",
              "next-themes",
              "ESLint",
              "Prettier",
            ].map((tech) => (
              <div
                key={tech}
                className="bg-card hover:bg-accent rounded-full border px-4 py-2 text-sm font-medium transition-all"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-card mx-auto mt-24 max-w-2xl rounded-lg border p-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">Sẵn sàng bắt đầu?</h2>
          <p className="text-muted-foreground mb-6">
            Xem demo để khám phá các components và tính năng có sẵn
          </p>
          <Link href="/demo">
            <Button size="lg" className="gap-2">
              <Rocket className="h-5 w-5" />
              Khám phá Demo
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="text-muted-foreground container text-center text-sm">
          <p>
            Đọc{" "}
            <Link href="#" className="hover:text-foreground underline">
              HUONG_DAN_CAI_DAT.md
            </Link>{" "}
            để biết thêm chi tiết
          </p>
        </div>
      </footer>
    </div>
  );
}
