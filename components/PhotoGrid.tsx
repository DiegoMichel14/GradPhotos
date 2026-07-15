// import { Play } from "lucide-react";
// import { Photo } from "@/lib/mock-photos";
// import EmptyState from "./EmptyState";

// interface PhotoGridProps {
//   photos: Photo[];
// }

// export default function PhotoGrid({ photos }: PhotoGridProps) {
//   if (photos.length === 0) return <EmptyState />;

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-4 pb-10">
//       {photos.map((photo) => (
//         <figure
//           key={photo.id}
//           className="relative group overflow-hidden rounded-lg border border-[#C7CDD6]/10 bg-[#0A1B33]"
//         >
//           {photo.kind === "image" ? (
//             <img
//               src={photo.url}
//               alt={`Foto de ${photo.uploadedBy}`}
//               className="w-full h-full object-cover aspect-square"
//             />
//           ) : (
//             <>
//               <video
//                 src={photo.url}
//                 className="w-full h-full object-cover aspect-square"
//                 muted
//               />
//               <span className="absolute inset-0 flex items-center justify-center bg-black/20">
//                 <Play className="w-6 h-6 text-[#F5F6F8]" fill="currentColor" />
//               </span>
//             </>
//           )}
//           <figcaption className="absolute inset-x-0 bottom-0 flex justify-between px-2 py-1.5 bg-gradient-to-t from-black/70 to-transparent">
//             <span className="font-mono text-[10px] text-[#F5F6F8]">{photo.uploadedBy}</span>
//             <span className="font-mono text-[10px] text-[#C7CDD6]">{photo.timestamp}</span>
//           </figcaption>
//         </figure>
//       ))}
//     </div>
//   );
// }





// import { Play } from "lucide-react";
// import { Photo } from "@/lib/types";
// import EmptyState from "./EmptyState";

// interface PhotoGridProps {
//   photos: Photo[];
// }

// export default function PhotoGrid({ photos }: PhotoGridProps) {
//   if (photos.length === 0) return <EmptyState />;

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-4 pb-10">
//       {photos.map((photo) => (
//         <figure
//           key={photo.id}
//           className="relative group overflow-hidden rounded-lg border border-[#C7CDD6]/10 bg-[#0A1B33]"
//         >
//           {photo.kind === "image" ? (
//             <img
//               src={photo.url}
//               alt=""
//               className="w-full h-full object-cover aspect-square"
//             />
//           ) : (
//             <>
//               <video
//                 src={photo.url}
//                 className="w-full h-full object-cover aspect-square"
//                 muted
//               />
//               <span className="absolute inset-0 flex items-center justify-center bg-black/20">
//                 <Play className="w-6 h-6 text-[#F5F6F8]" fill="currentColor" />
//               </span>
//             </>
//           )}
//           <figcaption className="absolute inset-x-0 bottom-0 flex justify-end px-2 py-1.5 bg-gradient-to-t from-black/70 to-transparent">
//             <span className="font-mono text-[10px] text-[#C7CDD6]">{photo.timestamp}</span>
//           </figcaption>
//         </figure>
//       ))}
//     </div>
//   );
// }









import { Play } from "lucide-react";
import { Photo } from "@/lib/types";
import EmptyState from "./EmptyState";

interface PhotoGridProps {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  if (photos.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-4 pb-10">
      {photos.map((photo) => (
        <figure
          key={photo.id}
          className="relative group overflow-hidden rounded-lg border border-[#C7CDD6]/10 bg-[#0033A0]"
        >
          {photo.kind === "image" ? (
            <img
              src={photo.url}
              alt={`Foto de ${photo.uploadedBy}`}
              className="w-full h-full object-cover aspect-square"
            />
          ) : (
            <>
              <video
                src={photo.url}
                className="w-full h-full object-cover aspect-square"
                muted
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Play className="w-6 h-6 text-[#F5F6F8]" fill="currentColor" />
              </span>
            </>
          )}
          <figcaption className="absolute inset-x-0 bottom-0 flex justify-between px-2 py-1.5 bg-gradient-to-t from-black/70 to-transparent">
            <span className="font-mono text-[10px] text-[#F5F6F8] truncate max-w-[70%]">
              {photo.uploadedBy}
            </span>
            <span className="font-mono text-[10px] text-[#C7CDD6]">{photo.timestamp}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}