/**
 * Auth Layout - Layout cho các pages authentication
 *
 * @description Layout đơn giản cho auth pages (login, register)
 * - Không có Sidebar và Header
 * - Background đẹp cho auth pages
 * - Responsive design
 * - Chỉ render children
 *
 * Structure:
 * AuthContainer → {children}
 */

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

      {/* Auth Content */}
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
