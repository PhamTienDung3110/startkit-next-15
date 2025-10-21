"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileSchema, type ProfileValues } from "@/lib/validators/profile";

export function DemoForm() {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(ProfileSchema),
    mode: "onBlur", // validate khi blur
    defaultValues: { name: "", email: "" },
  });

  async function onSubmit(values: ProfileValues) {
    // TODO: gọi server action hoặc API
    console.log("submit:", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên của bạn" {...field} />
              </FormControl>
              <FormMessage /> {/* Hiện lỗi từ zod */}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={!form.formState.isValid}>
            Lưu
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
