export interface Photo {
  id: string;
  url: string;
  kind: "image" | "video";
  uploadedBy: string;
  timestamp: string;
}