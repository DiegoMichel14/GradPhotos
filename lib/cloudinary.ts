// import { v2 as cloudinary } from "cloudinary";
// import { Photo } from "./types";

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const FOLDER = "graduacion-2026";

// interface CloudinaryResource {
//   public_id: string;
//   secure_url: string;
//   created_at: string;
// }

// type PhotoWithKind = CloudinaryResource & { kind: "image" | "video" };

// export async function getPhotos(): Promise<Photo[]> {
//   const [images, videos] = await Promise.all([
//     cloudinary.api.resources({
//       type: "upload",
//       resource_type: "image",
//       prefix: FOLDER,
//       max_results: 100,
//     }),
//     cloudinary.api.resources({
//       type: "upload",
//       resource_type: "video",
//       prefix: FOLDER,
//       max_results: 100,
//     }),
//   ]);

//   const combined: PhotoWithKind[] = [
//     ...images.resources.map((r: CloudinaryResource) => ({ ...r, kind: "image" as const })),
//     ...videos.resources.map((r: CloudinaryResource) => ({ ...r, kind: "video" as const })),
//   ].sort(
//     (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//   );

//   return combined.map((r) => ({
//     id: r.public_id,
//     url: r.secure_url,
//     kind: r.kind,
//     timestamp: new Date(r.created_at).toLocaleTimeString("es-MX", {
//       hour: "2-digit",
//       minute: "2-digit",
//     }),
//   }));
// }




import { v2 as cloudinary } from "cloudinary";
import { Photo } from "./types";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FOLDER = "graduacion-2026";

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  created_at: string;
  context?: {
    custom?: {
      uploader?: string;
    };
  };
}

type PhotoWithKind = CloudinaryResource & { kind: "image" | "video" };

export async function getPhotos(): Promise<Photo[]> {
  const [images, videos] = await Promise.all([
    cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix: FOLDER,
      max_results: 100,
      context: true,
    }),
    cloudinary.api.resources({
      type: "upload",
      resource_type: "video",
      prefix: FOLDER,
      max_results: 100,
      context: true,
    }),
  ]);

  const combined: PhotoWithKind[] = [
    ...images.resources.map((r: CloudinaryResource) => ({ ...r, kind: "image" as const })),
    ...videos.resources.map((r: CloudinaryResource) => ({ ...r, kind: "video" as const })),
  ].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return combined.map((r) => ({
    id: r.public_id,
    url: r.secure_url,
    kind: r.kind,
    uploadedBy: r.context?.custom?.uploader ?? "Invitado",
    timestamp: new Date(r.created_at).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
}