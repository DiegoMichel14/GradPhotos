"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export default function RefreshButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.refresh()}
      className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8975A] hover:text-[#F5F6F8] transition-colors"
    >
      <RefreshCw className="w-3 h-3" />
      Actualizar
    </button>
  );
}