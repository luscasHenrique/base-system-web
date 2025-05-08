export interface Log {
  id: number;
  user_id: number; // FK
  action: string;
  timestamp: string | null;
}
