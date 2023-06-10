/* Para no atarse a prisma, el profe recomienda crear nuestras proprias interfaces, 
para que se después se cambia a otra ORM o ODM como mongoDB y mongoose, nuestras interfaces 
siguen estando. 
Prisma provee import {User, UserAddress} from '@prisma/client', pero no lo usamos por tal motivo */
export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  roleId: number;
}

export interface UserAddress {
  id: number;
  street: string;
  number: string;
  zipCode: string;
  city: string;
  userId: number;
}
