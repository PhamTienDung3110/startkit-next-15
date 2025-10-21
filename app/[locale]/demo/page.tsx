import { DemoForm } from "@/components/forms/DemoForm";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DemoPage() {
  const t = useTranslations("Home");

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Về trang chủ
            </Link>
            <h1 className="text-4xl font-bold">🎨 Demo Components</h1>
            <p className="text-muted-foreground mt-2">
              Showcase các components và tính năng có sẵn trong project
            </p>
          </div>
          {t("welcome")}
          <ThemeToggle />
        </div>

        {/* Demo Sections */}
        <div className="space-y-12">
          {/* Section 1: Buttons */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Buttons (shadcn/ui)</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Button component với nhiều variants và sizes khác nhau
            </p>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium">Variants:</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">Sizes:</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">📌</Button>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">States:</p>
                <div className="flex flex-wrap gap-2">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Theme Toggle */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Dark Mode (next-themes)</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Theme switcher với light/dark mode. Tự động phát hiện system preference và lưu vào
              localStorage.
            </p>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <p className="text-muted-foreground text-sm">
                Click icon để chuyển đổi giữa light và dark mode
              </p>
            </div>
          </section>

          {/* Section 3: Form with React Hook Form + Zod */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Form Validation (React Hook Form + Zod)</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Form với validation type-safe sử dụng React Hook Form và Zod schema. Form tự động
              validate khi blur và hiển thị error messages.
            </p>
            <div className="bg-muted/50 rounded-lg p-6">
              <DemoForm />
            </div>
            <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                💡 Tip: Thử nhập tên ngắn hơn 2 ký tự hoặc email không hợp lệ để xem validation
              </p>
            </div>
          </section>

          {/* Section 4: Typography */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Typography</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Font system sử dụng Geist Sans và Geist Mono từ Vercel
            </p>
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold">Heading 1</h1>
                <h2 className="text-3xl font-semibold">Heading 2</h2>
                <h3 className="text-2xl font-semibold">Heading 3</h3>
                <h4 className="text-xl font-semibold">Heading 4</h4>
              </div>
              <div>
                <p className="text-base">
                  Body text - Đây là đoạn văn bản thông thường với font Geist Sans.
                </p>
                <p className="text-muted-foreground text-sm">Small text - Text phụ với màu muted</p>
                <code className="bg-muted rounded px-2 py-1 font-mono text-sm">
                  const code = &quot;Geist Mono&quot;;
                </code>
              </div>
            </div>
          </section>

          {/* Section 5: Colors */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Colors (CSS Variables)</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Color system sử dụng CSS variables, tự động adapt với dark mode
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <div className="bg-background h-20 rounded-lg"></div>
                <p className="text-sm font-medium">Background</p>
              </div>
              <div className="space-y-2">
                <div className="bg-foreground h-20 rounded-lg"></div>
                <p className="text-sm font-medium">Foreground</p>
              </div>
              <div className="space-y-2">
                <div className="bg-primary h-20 rounded-lg"></div>
                <p className="text-sm font-medium">Primary</p>
              </div>
              <div className="space-y-2">
                <div className="bg-secondary h-20 rounded-lg"></div>
                <p className="text-sm font-medium">Secondary</p>
              </div>
              <div className="space-y-2">
                <div className="bg-muted h-20 rounded-lg"></div>
                <p className="text-sm font-medium">Muted</p>
              </div>
              <div className="space-y-2">
                <div className="bg-accent h-20 rounded-lg"></div>
                <p className="text-sm font-medium">Accent</p>
              </div>
              <div className="space-y-2">
                <div className="bg-card h-20 rounded-lg border"></div>
                <p className="text-sm font-medium">Card</p>
              </div>
              <div className="space-y-2">
                <div className="bg-destructive h-20 rounded-lg"></div>
                <p className="text-sm font-medium">Destructive</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="text-muted-foreground mt-12 border-t pt-8 text-center text-sm">
          <p>
            Xem thêm tài liệu tại{" "}
            <Link href="/" className="text-foreground underline">
              HUONG_DAN_CAI_DAT.md
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
