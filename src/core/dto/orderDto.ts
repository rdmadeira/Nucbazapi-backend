export interface OrderItemsDto {
  title: string;
  description?: string;
  quantity: number;
  unityPrice: number;
  productId: number;
  picture_url?: string;
}

export interface OrderRequestDto {
  userId: number;
  shippingDetails: {
    domicilio: string;
    localidad: string;
  };
  items: OrderItemsDto[];
  shippingPrice: number;
  subtotal: number;
  total: number;
}

export interface OrderResponseDto {
  orderId: string;
  preferenceId: string;
  init_point: string;
}

export interface OrderUpdateRequestDto {
  id: string;
  paymentId: string | null;
  merchanOrderId: string | null;
  status: string;
}
