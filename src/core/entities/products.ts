export interface Product {
  id: number;
  name: String;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  description: String;
  imgUrl: string;
  categoryId: number;
}
