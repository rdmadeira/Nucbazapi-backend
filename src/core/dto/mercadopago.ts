export enum Currencies {
  ARS = 'ARS',
}

export interface PaymentItem {
  title?: string;
  description?: string;
  quantity: number;
  currency_id: Currencies;
  unit_price: number;
  picture_url?: string;
}

export interface MercadoPagoResponse {
  preferenceId: string;
  init_point: string;
  sandbox_init_point: string;
}

export interface MercadoPagoPaymentRequest {
  items: PaymentItem[];
  shipments?: {
    cost?: number;
  };
  external_reference: string; // es el id de nuestro order que sirvirá de referencia
}

export interface MercadoPagoPaymentResponseDto {
  payment_id?: string;
  merchant_order_id?: string;
  date_created?: string;
  date_approved?: string;
  date_last_updated?: string;
  money_release_date?: string;
  operation_type?: string;
  payment_method_id?: string;
  payment_type_id?: string;
  status?: string;
  status_detail?: string;
  currency_id?: string;
  description?: string;
  external_reference?: string;
}

export interface MercadoPagoPaymentsResponseDto {
  results: MercadoPagoPaymentResponseDto | null;
  paging: { total: number; limit: number; offset: number } | null;
}
