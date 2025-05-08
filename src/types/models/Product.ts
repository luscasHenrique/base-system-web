export interface Product {
  id: number;
  qrcode?: string | null;
  name: string;
  price: number;
  company: string;
  description?: string | null;
  created_at: string | null;
  quantity: number;
  user_id: number; // FK para User
  deleted_at?: string | null;
}
