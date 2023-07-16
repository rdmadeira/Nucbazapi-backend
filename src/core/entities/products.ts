export interface Product {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  description: string;
  imgUrl: string;
  categoryId: number;
}
