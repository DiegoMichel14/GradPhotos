import Link from "next/link";
import Header from "@/components/Header";
import UploadSeal from "@/components/UploadSeal";

export default function UploadPage() {
  return (
    <main className="min-h-dvh bg-bokeh flex flex-col">
      <Header
        eyebrow="Graduación 2026"
        title="Comparte tus fotos"
        subtitle="Sube las fotos y videos que tomaste durante el festejo para el recuerdo de todos"
      />
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <UploadSeal />
      </div>
      <footer className="pb-8 flex flex-col items-center gap-3">
        <Link
          href="/galeria"
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8975A] hover:text-[#F5F6F8] transition-colors"
        >
          Ver galería →
        </Link>
        <p className="font-mono text-[10px] tracking-wide text-[#C7CDD6]/40 uppercase">
          Tecnológico de Monterrey
        </p>
      </footer>
    </main>
  );
}