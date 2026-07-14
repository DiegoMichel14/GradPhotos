export interface Photo {
  id: string;
  url: string;
  kind: "image" | "video";
  uploadedBy: string;
  timestamp: string;
}

export const mockPhotos: Photo[] = [
  { id: "1", url: "https://picsum.photos/seed/grad1/500/500", kind: "image", uploadedBy: "Ana", timestamp: "22:14" },
  { id: "2", url: "https://picsum.photos/seed/grad2/500/700", kind: "image", uploadedBy: "Luis", timestamp: "22:20" },
  { id: "3", url: "https://picsum.photos/seed/grad3/500/500", kind: "image", uploadedBy: "Pau", timestamp: "22:31" },
  { id: "4", url: "https://picsum.photos/seed/grad4/500/650", kind: "image", uploadedBy: "Diego", timestamp: "22:40" },
  { id: "5", url: "https://picsum.photos/seed/grad5/500/500", kind: "image", uploadedBy: "Vale", timestamp: "22:52" },
  { id: "6", url: "https://picsum.photos/seed/grad6/500/700", kind: "image", uploadedBy: "Emi", timestamp: "23:05" },
];