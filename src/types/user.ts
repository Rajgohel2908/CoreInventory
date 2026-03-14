export interface User {
  id: string;
  name: string;
  email: string;
  role: "MANAGER" | "STAFF";
  company?: string;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  lastActive?: string;
  createdAt: string;
}
