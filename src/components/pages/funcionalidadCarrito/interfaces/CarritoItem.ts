import type { Product } from "../../verProductos/interfaces/Product";


export interface CarritoItem extends Product {
    cantidad: number;
    id_item_orden: number;
}