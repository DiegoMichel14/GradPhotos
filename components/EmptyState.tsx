import { ImageOff } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center px-6">
      <ImageOff className="w-8 h-8 text-[#C7CDD6]/50" strokeWidth={1.5} />
      <p className="text-[#C7CDD6] text-sm">
        Aún no hay fotos. En cuanto los invitados empiecen a subir, aparecerán aquí.
      </p>
    </div>
  );
}