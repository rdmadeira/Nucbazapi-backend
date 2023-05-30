export interface Category {
  id: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

// DTOs - son data transfer objects, no es el proprio model, con toda la info, pero es un objecto con
// parte de la info que va al frontend
