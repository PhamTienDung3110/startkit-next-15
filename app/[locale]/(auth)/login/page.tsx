"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, Mail, Lock, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { getAuthPath } from "@/constants/paths";

function Login() {
  const t = useTranslations("Auth.login");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();

  const switchLanguage = (newLocale: string) => {
    const newPath = getAuthPath("LOGIN", newLocale);
    router.push(newPath);
  };

  return (
    <div className="w-full max-w-6xl">
      {/* Language Switcher */}
      <div className="mb-4 flex justify-end">
        <div className="flex gap-2">
          <Button
            variant={locale === "vi" ? "default" : "outline"}
            size="sm"
            onClick={() => switchLanguage("vi")}
          >
            VI
          </Button>
          <Button
            variant={locale === "en" ? "default" : "outline"}
            size="sm"
            onClick={() => switchLanguage("en")}
          >
            EN
          </Button>
          <Button
            variant={locale === "jp" ? "default" : "outline"}
            size="sm"
            onClick={() => switchLanguage("jp")}
          >
            JP
          </Button>
        </div>
      </div>

      <Card className="bg-background/95 supports-[backdrop-filter]:bg-background/60 overflow-hidden border-0 shadow-2xl backdrop-blur">
        <div className="flex min-h-[600px]">
          {/* Left Side - Form */}
          <div className="flex flex-1 flex-col justify-center p-8">
            <div className="mx-auto w-full max-w-sm space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
                <p className="text-muted-foreground">{t("subtitle")}</p>
              </div>

              {/* Login Form */}
              <form className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t("email")}
                  </Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="h-12 pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      {t("password")}
                    </Label>
                    <Link
                      href={getAuthPath("FORGOT_PASSWORD", locale)}
                      className="text-primary text-sm hover:underline"
                    >
                      {t("forgot")}
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 pr-10 pl-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 h-12 px-3 hover:bg-transparent"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="remember" className="text-muted-foreground text-sm">
                    {t("remember")}
                  </Label>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="h-12 w-full text-base font-medium">
                  {t("submit")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground px-2">{t("social")}</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="flex gap-3">
                <Button variant="outline" className="h-12 flex-1">
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="h-12 flex-1">
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2.156-.172-4.436 1.183-5.61 1.183zm2.83-8.95c1.156 1.064 1.83 2.538 1.597 4.027-1.429.065-2.884-.987-3.91-2.051-1.026-1.064-1.637-2.538-1.429-4.027 1.598.13 3.182 1.051 4.342 2.051z" />
                  </svg>
                  Apple
                </Button>
                <Button variant="outline" className="h-12 flex-1">
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                  Twitter
                </Button>
              </div>

              {/* Footer */}
              <div className="text-muted-foreground text-center text-sm">
                <span>{t("noAccount")} </span>
                <Link
                  href={getAuthPath("REGISTER", locale)}
                  className="text-primary font-medium hover:underline"
                >
                  {t("register")}
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative hidden overflow-hidden lg:flex lg:flex-1">
            <Image
              src="https://ui.shadcn.com/placeholder.svg"
              alt="Login illustration"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Login;
