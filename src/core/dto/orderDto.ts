interface OrderItemsDto {
  title: string;
  quantity: number;
  unityPrice: number;
  productId: number;
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
  orderId: number;
  preferenceId: string;
  init_point: string;
}
