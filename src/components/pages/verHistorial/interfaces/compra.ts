import type { ItemCompra } from "./itemCompra";

export interface Compra{
  id: number;
  date: string;
  total: number;
  items: ItemCompra[];
  metodoPago?: string;
}
