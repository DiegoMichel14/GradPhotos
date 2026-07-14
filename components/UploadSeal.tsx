// "use client";

// import { useRef, useState } from "react";
// import { ImagePlus, Check, Loader2, Video as VideoIcon, X } from "lucide-react";

// type ItemStatus = "uploading" | "success";

// interface QueuedItem {
//   id: string;
//   url: string;
//   kind: "image" | "video";
//   status: ItemStatus;
// }

// export default function UploadSeal() {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [items, setItems] = useState<QueuedItem[]>([]);

//   const handleFiles = (fileList: FileList) => {
//     const files = Array.from(fileList);

//     const newItems: QueuedItem[] = files.map((file) => ({
//       id: `${file.name}-${crypto.randomUUID()}`,
//       url: URL.createObjectURL(file),
//       kind: file.type.startsWith("video") ? "video" : "image",
//       status: "uploading",
//     }));

//     setItems((prev) => [...newItems, ...prev]);

//     // Simulación de subida — aquí se conectará el storage real más adelante
//     newItems.forEach((item) => {
//       const delay = 900 + Math.random() * 900;
//       setTimeout(() => {
//         setItems((prev) =>
//           prev.map((i) => (i.id === item.id ? { ...i, status: "success" } : i))
//         );
//       }, delay);
//     });
//   };

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       handleFiles(e.target.files);
//     }
//     e.target.value = "";
//   };

//   const removeItem = (id: string) => {
//     setItems((prev) => prev.filter((i) => i.id !== id));
//   };

//   const uploadingCount = items.filter((i) => i.status === "uploading").length;

//   return (
//     <div className="flex flex-col items-center gap-6 w-full">
//       <input
//         ref={inputRef}
//         type="file"
//         accept="image/*,video/*"
//         multiple
//         onChange={onChange}
//         className="hidden"
//       />

//       <button
//         onClick={() => inputRef.current?.click()}
//         className="relative w-40 h-40 rounded-full flex items-center justify-center
//                    bg-[#0A1B33] border border-[#B8975A]/50
//                    shadow-[0_0_0_1px_rgba(184,151,90,0.15),0_20px_40px_-15px_rgba(0,0,0,0.6)]
//                    transition-transform active:scale-95"
//       >
//         <span className="absolute inset-2 rounded-full border border-[#C7CDD6]/20" />
//         <ImagePlus className="w-9 h-9 text-[#B8975A]" strokeWidth={1.5} />
//       </button>

//       <p className="font-mono text-xs tracking-wide text-[#C7CDD6] uppercase text-center">
//         {uploadingCount > 0
//           ? `Subiendo ${uploadingCount} archivo${uploadingCount > 1 ? "s" : ""}…`
//           : "Toca para elegir fotos o videos"}
//       </p>

//       {items.length > 0 && (
//         <div className="grid grid-cols-3 gap-2 w-full max-w-sm px-2">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="relative aspect-square rounded-lg overflow-hidden border border-[#C7CDD6]/15 bg-[#0A1B33]"
//             >
//               {item.kind === "image" ? (
//                 <img src={item.url} alt="" className="w-full h-full object-cover" />
//               ) : (
//                 <video src={item.url} className="w-full h-full object-cover" muted />
//               )}

//               {item.kind === "video" && (
//                 <span className="absolute top-1 left-1 bg-black/60 rounded-full p-1">
//                   <VideoIcon className="w-3 h-3 text-[#F5F6F8]" strokeWidth={2} />
//                 </span>
//               )}

//               <div className="absolute inset-0 flex items-center justify-center bg-black/40">
//                 {item.status === "uploading" ? (
//                   <Loader2 className="w-5 h-5 text-[#F5F6F8] animate-spin" strokeWidth={2} />
//                 ) : (
//                   <Check className="w-5 h-5 text-[#B8975A]" strokeWidth={3} />
//                 )}
//               </div>

//               {item.status === "success" && (
//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
//                   aria-label="Quitar de la lista"
//                 >
//                   <X className="w-3 h-3 text-[#F5F6F8]" strokeWidth={2.5} />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }









// "use client";

// import { useRef, useState } from "react";
// import { ImagePlus, Check, Loader2, Video as VideoIcon, X, AlertTriangle } from "lucide-react";

// type ItemStatus = "uploading" | "success" | "error";

// interface QueuedItem {
//   id: string;
//   url: string;
//   kind: "image" | "video";
//   status: ItemStatus;
//   file: File;
// }

// const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
// const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

// async function uploadToCloudinary(file: File) {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", UPLOAD_PRESET!);
//   formData.append("folder", "graduacion-2026");

//   const res = await fetch(
//     `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
//     { method: "POST", body: formData }
//   );

//   if (!res.ok) throw new Error("Upload failed");
//   return res.json();
// }

// export default function UploadSeal() {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [items, setItems] = useState<QueuedItem[]>([]);

//   const handleFiles = (fileList: FileList) => {
//     const files = Array.from(fileList);

//     const newItems: QueuedItem[] = files.map((file) => ({
//       id: `${file.name}-${crypto.randomUUID()}`,
//       url: URL.createObjectURL(file),
//       kind: file.type.startsWith("video") ? "video" : "image",
//       status: "uploading",
//       file,
//     }));

//     setItems((prev) => [...newItems, ...prev]);

//     newItems.forEach((item) => {
//       uploadToCloudinary(item.file)
//         .then(() => {
//           setItems((prev) =>
//             prev.map((i) => (i.id === item.id ? { ...i, status: "success" } : i))
//           );
//         })
//         .catch(() => {
//           setItems((prev) =>
//             prev.map((i) => (i.id === item.id ? { ...i, status: "error" } : i))
//           );
//         });
//     });
//   };

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       handleFiles(e.target.files);
//     }
//     e.target.value = "";
//   };

//   const removeItem = (id: string) => {
//     setItems((prev) => prev.filter((i) => i.id !== id));
//   };

//   const uploadingCount = items.filter((i) => i.status === "uploading").length;

//   return (
//     <div className="flex flex-col items-center gap-6 w-full">
//       <input
//         ref={inputRef}
//         type="file"
//         accept="image/*,video/*"
//         multiple
//         onChange={onChange}
//         className="hidden"
//       />

//       <button
//         onClick={() => inputRef.current?.click()}
//         className="relative w-40 h-40 rounded-full flex items-center justify-center
//                    bg-[#0A1B33] border border-[#B8975A]/50
//                    shadow-[0_0_0_1px_rgba(184,151,90,0.15),0_20px_40px_-15px_rgba(0,0,0,0.6)]
//                    transition-transform active:scale-95"
//       >
//         <span className="absolute inset-2 rounded-full border border-[#C7CDD6]/20" />
//         <ImagePlus className="w-9 h-9 text-[#B8975A]" strokeWidth={1.5} />
//       </button>

//       <p className="font-mono text-xs tracking-wide text-[#C7CDD6] uppercase text-center">
//         {uploadingCount > 0
//           ? `Subiendo ${uploadingCount} archivo${uploadingCount > 1 ? "s" : ""}…`
//           : "Toca para elegir fotos o videos"}
//       </p>

//       {items.length > 0 && (
//         <div className="grid grid-cols-3 gap-2 w-full max-w-sm px-2">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="relative aspect-square rounded-lg overflow-hidden border border-[#C7CDD6]/15 bg-[#0A1B33]"
//             >
//               {item.kind === "image" ? (
//                 <img src={item.url} alt="" className="w-full h-full object-cover" />
//               ) : (
//                 <video src={item.url} className="w-full h-full object-cover" muted />
//               )}

//               {item.kind === "video" && (
//                 <span className="absolute top-1 left-1 bg-black/60 rounded-full p-1">
//                   <VideoIcon className="w-3 h-3 text-[#F5F6F8]" strokeWidth={2} />
//                 </span>
//               )}

//               <div className="absolute inset-0 flex items-center justify-center bg-black/40">
//                 {item.status === "uploading" && (
//                   <Loader2 className="w-5 h-5 text-[#F5F6F8] animate-spin" strokeWidth={2} />
//                 )}
//                 {item.status === "success" && (
//                   <Check className="w-5 h-5 text-[#B8975A]" strokeWidth={3} />
//                 )}
//                 {item.status === "error" && (
//                   <AlertTriangle className="w-5 h-5 text-red-400" strokeWidth={2} />
//                 )}
//               </div>

//               {item.status !== "uploading" && (
//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
//                   aria-label="Quitar de la lista"
//                 >
//                   <X className="w-3 h-3 text-[#F5F6F8]" strokeWidth={2.5} />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }










"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Check, Loader2, Video as VideoIcon, X, AlertTriangle } from "lucide-react";

type ItemStatus = "uploading" | "success" | "error";

interface QueuedItem {
  id: string;
  url: string;
  kind: "image" | "video";
  status: ItemStatus;
  file: File;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const NAME_STORAGE_KEY = "grad-uploader-name";

async function uploadToCloudinary(file: File, uploaderName: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET!);
  formData.append("folder", "graduacion-2026");
  formData.append("context", `uploader=${uploaderName}`);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export default function UploadSeal() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<QueuedItem[]>([]);
  const [name, setName] = useState("");
  const [nameLocked, setNameLocked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(NAME_STORAGE_KEY);
    if (saved) {
      setName(saved);
      setNameLocked(true);
    }
  }, []);

  const confirmName = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem(NAME_STORAGE_KEY, trimmed);
    setNameLocked(true);
  };

  const handleFiles = (fileList: FileList) => {
    const files = Array.from(fileList);

    const newItems: QueuedItem[] = files.map((file) => ({
      id: `${file.name}-${crypto.randomUUID()}`,
      url: URL.createObjectURL(file),
      kind: file.type.startsWith("video") ? "video" : "image",
      status: "uploading",
      file,
    }));

    setItems((prev) => [...newItems, ...prev]);

    newItems.forEach((item) => {
      uploadToCloudinary(item.file, name.trim())
        .then(() => {
          setItems((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, status: "success" } : i))
          );
        })
        .catch(() => {
          setItems((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, status: "error" } : i))
          );
        });
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    e.target.value = "";
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const uploadingCount = items.filter((i) => i.status === "uploading").length;

  if (!nameLocked) {
    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <p className="font-mono text-xs tracking-wide text-[#C7CDD6] uppercase text-center">
          Nombre del invitado:
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && confirmName()}
          placeholder=" "
          className="w-full bg-transparent border border-[#C7CDD6]/30 rounded-full px-5 py-3
                     text-center text-[#F5F6F8] placeholder:text-[#C7CDD6]/40
                     focus:outline-none focus:border-[#B8975A] transition-colors"
          autoFocus
        />
        <button
          onClick={confirmName}
          disabled={!name.trim()}
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8975A]
                     disabled:opacity-30 hover:text-[#F5F6F8] transition-colors"
        >
          Continuar →
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={onChange}
        className="hidden"
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="relative w-40 h-40 rounded-full flex items-center justify-center
                   bg-[#0A1B33] border border-[#B8975A]/50
                   shadow-[0_0_0_1px_rgba(184,151,90,0.15),0_20px_40px_-15px_rgba(0,0,0,0.6)]
                   transition-transform active:scale-95"
      >
        <span className="absolute inset-2 rounded-full border border-[#C7CDD6]/20" />
        <ImagePlus className="w-9 h-9 text-[#B8975A]" strokeWidth={1.5} />
      </button>

      <div className="flex flex-col items-center gap-1">
        <p className="font-mono text-xs tracking-wide text-[#C7CDD6] uppercase text-center">
          {uploadingCount > 0
            ? `Subiendo ${uploadingCount} archivo${uploadingCount > 1 ? "s" : ""}…`
            : "Toca para elegir fotos o videos"}
        </p>
        <button
          onClick={() => setNameLocked(false)}
          className="font-mono text-[10px] text-[#C7CDD6]/50 hover:text-[#B8975A] transition-colors"
        >
          Subiendo como {name} · cambiar
        </button>
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-2 w-full max-w-sm px-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-lg overflow-hidden border border-[#C7CDD6]/15 bg-[#0A1B33]"
            >
              {item.kind === "image" ? (
                <img src={item.url} alt="" className="w-full h-full object-cover" />
              ) : (
                <video src={item.url} className="w-full h-full object-cover" muted />
              )}

              {item.kind === "video" && (
                <span className="absolute top-1 left-1 bg-black/60 rounded-full p-1">
                  <VideoIcon className="w-3 h-3 text-[#F5F6F8]" strokeWidth={2} />
                </span>
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                {item.status === "uploading" && (
                  <Loader2 className="w-5 h-5 text-[#F5F6F8] animate-spin" strokeWidth={2} />
                )}
                {item.status === "success" && (
                  <Check className="w-5 h-5 text-[#B8975A]" strokeWidth={3} />
                )}
                {item.status === "error" && (
                  <AlertTriangle className="w-5 h-5 text-red-400" strokeWidth={2} />
                )}
              </div>

              {item.status !== "uploading" && (
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
                  aria-label="Quitar de la lista"
                >
                  <X className="w-3 h-3 text-[#F5F6F8]" strokeWidth={2.5} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}