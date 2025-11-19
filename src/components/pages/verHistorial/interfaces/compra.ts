import type { ItemCompra } from "./itemCompra";

export interface Compra{
  id_orden: number;
  total: number;
  fecha: string;
  items: ItemCompra[];
  metodoPago?: string;
}
