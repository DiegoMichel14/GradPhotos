"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Photo } from "@/lib/types";

interface LightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function getDownloadUrl(url: string) {
  // Inserta fl_attachment para que Cloudinary fuerce la descarga
  // en vez de abrir el archivo dentro del navegador.
  return url.replace("/upload/", "/upload/fl_attachment/");
}

export default function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const photo = photos[index];

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % photos.length);
  }, [index, photos.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [goPrev, goNext, onClose]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-[#F5F6F8] hover:bg-black/70 transition-colors"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5" />
      </button>

      <a
        href={getDownloadUrl(photo.url)}
        download
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 left-4 p-2 rounded-full bg-black/50 text-[#F5F6F8] hover:bg-black/70 transition-colors"
        aria-label="Descargar"
      >
        <Download className="w-5 h-5" />
      </a>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="absolute left-2 sm:left-4 p-2 rounded-full bg-black/50 text-[#F5F6F8] hover:bg-black/70 transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="absolute right-2 sm:right-4 p-2 rounded-full bg-black/50 text-[#F5F6F8] hover:bg-black/70 transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div
        className="max-w-3xl max-h-[85dvh] w-full flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {photo.kind === "image" ? (
          <img
            src={photo.url}
            alt={`Foto de ${photo.uploadedBy}`}
            className="max-h-[75dvh] w-auto max-w-full object-contain rounded-lg"
          />
        ) : (
          <video
            src={photo.url}
            controls
            autoPlay
            className="max-h-[75dvh] w-auto max-w-full object-contain rounded-lg"
          />
        )}

        <div className="flex items-center gap-4 font-mono text-xs text-[#C7CDD6]">
          <span className="text-[#F5F6F8]">{photo.uploadedBy}</span>
          <span>·</span>
          <span>{photo.timestamp}</span>
          <span>·</span>
          <span>{index + 1} / {photos.length}</span>
        </div>
      </div>
    </div>
  );
}