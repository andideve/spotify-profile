export type UID = string | number;

export interface User {
  uid: UID;
  name: string;
  images: { width: number; url: string }[];
}
