// import Link from "next/link";
// import Header from "@/components/Header";
// import PhotoGrid from "@/components/PhotoGrid";
// import { mockPhotos } from "@/lib/mock-photos";

// export default function GaleriaPage() {
//   return (
//     <main className="min-h-dvh bg-bokeh">
//       <Header eyebrow={`${mockPhotos.length} archivos`} title="Galería de la noche" />
//       <div className="flex justify-center pb-6">
//         <Link
//           href="/"
//           className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8975A] hover:text-[#F5F6F8] transition-colors"
//         >
//           ← Subir foto o video
//         </Link>
//       </div>
//       <PhotoGrid photos={mockPhotos} />
//     </main>
//   );
// }






import Link from "next/link";
import Header from "@/components/Header";
import PhotoGrid from "@/components/PhotoGrid";
import RefreshButton from "@/components/RefreshButton";
import { getPhotos } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export default async function GaleriaPage() {
  const photos = await getPhotos();

  return (
    <main className="min-h-dvh bg-bokeh">
      <Header eyebrow={`${photos.length} archivos`} title="Galería de la noche" />
      <div className="flex items-center justify-center gap-6 pb-6">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8975A] hover:text-[#F5F6F8] transition-colors"
        >
          ← Subir foto o video
        </Link>
        <RefreshButton />
      </div>
      <PhotoGrid photos={photos} />
    </main>
  );
}