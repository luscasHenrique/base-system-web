export type SaleStatus = 'Venda' | 'Estorno';

export interface Sale {
  id: number;
  product_id: number; // FK
  user_id: number; // FK
  quantity: number;
  total_value: number;
  status: SaleStatus;
  stock_after_action: number;
  created_at: string | null;
}
