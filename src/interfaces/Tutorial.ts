import { ReactNode } from "react";

export default interface Tutorial {
  id?: number;
  title: string;
  content: string | TrustedHTML;
  createAt?: string;
  updatedAt?: string;
  updatedUser?: string;
  group?: string;
}
