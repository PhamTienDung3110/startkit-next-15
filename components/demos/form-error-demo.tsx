/**
 * Form Error Demo Component
 * 
 * @description Demo component để showcase error styling trong forms
 * - Input với error state
 * - Visual feedback khi validation fails
 * - Reusable error styling patterns
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInputClasses, inputClasses } from "@/lib/utils/form";

export function FormErrorDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Email là bắt buộc");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Email không hợp lệ");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("Mật khẩu là bắt buộc");
      return false;
    }
    if (value.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid) {
      alert("Form hợp lệ! ✅");
    }
  };

  const clearErrors = () => {
    setEmailError(null);
    setPasswordError(null);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Form Error Demo</CardTitle>
        <CardDescription>
          Demo error styling với border đỏ khi validation fails
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="demo-email">Email</Label>
            <Input
              id="demo-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
              }}
              onBlur={() => validateEmail(email)}
              className={getInputClasses(
                inputClasses.base,
                emailError ? { message: emailError } : undefined
              )}
            />
            {emailError && (
              <p className="text-sm text-red-500">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="demo-password">Mật khẩu</Label>
            <Input
              id="demo-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) validatePassword(e.target.value);
              }}
              onBlur={() => validatePassword(password)}
              className={getInputClasses(
                inputClasses.base,
                passwordError ? { message: passwordError } : undefined
              )}
            />
            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Submit
            </Button>
            <Button type="button" variant="outline" onClick={clearErrors}>
              Clear Errors
            </Button>
          </div>
        </form>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Hướng dẫn:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Nhập email không hợp lệ để xem error</li>
            <li>• Nhập mật khẩu ngắn hơn 6 ký tự</li>
            <li>• Click "Clear Errors" để xóa lỗi</li>
            <li>• Border sẽ chuyển thành đỏ khi có lỗi</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
