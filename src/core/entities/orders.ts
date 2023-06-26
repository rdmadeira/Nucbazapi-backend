export interface Orders {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  paymentId: string | null;
  merchanOrderId: string | null;
  userId: number;
  statusId: number;
}

export interface OrderItems {
  id?: number;
  quantity: number;
  unityPrice: number;
  orderId?: number;
  productId: number;
}
