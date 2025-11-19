interface FormData {
  nombre: string;
  email: string;
  direccion: string;
  metodoPago: "tarjeta" | "transferencia";

  //tarjeta
  numeroTarjeta?: string;
  vencimientoTarjeta?: string;
  cvvTarjeta?: string;

  //transferencia (del cliente a la tienda)
  bancoCliente?: string;
  aliasCliente?: string;
  titularCliente?: string;
  numeroOperacion?: string; //nro de operacion bancaria, comprobante de transferencia

}

export type { FormData };