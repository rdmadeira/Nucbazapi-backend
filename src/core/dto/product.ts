export interface ProductRequestDto {
  name: string;
  price: number;
  description: string;
  imgUrl: string;
  categoryId: number;
}

export interface ProductResponseDto {
  name: string;
  price?: number;
  categoryId: number;
}

export interface ProductUpdateData {
  name?: string;
  price?: number;
  description?: string;
  imgUrl?: string;
  categoryId?: number;
}
