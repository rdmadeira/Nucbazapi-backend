import { PrismaClient } from '@prisma/client';

// Agregamos prisma al objeto global de NodeJs:
interface CustomNodeJsGlobal extends Global {
  prisma: PrismaClient;
}

// Evitase multiplas instancias de Client de Prisma, toma la interface como instancia
declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient(); //hacer en el cli npx prisma generate

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma;
