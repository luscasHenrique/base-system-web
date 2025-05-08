export type StockLogStatus = 'Editado' | 'Excluído' | 'Venda' | 'Estorno';

export interface StockLog {
  id: number;
  product_id: number; // FK
  user_id: number; // FK
  change_value: number;
  current_quantity: number;
  timestamp: string | null;
  description?: string | null;
  status: StockLogStatus;
  total_value: number;
  updated_value: number;
}
