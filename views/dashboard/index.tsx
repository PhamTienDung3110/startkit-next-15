"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Dashboard() {
  return (
    <Button
      onClick={() => toast.success("Lưu thành công!", { description: "Dữ liệu đã được cập nhật." })}
    >
      Lưu
    </Button>
  );
}
