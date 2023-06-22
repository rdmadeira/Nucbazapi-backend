import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seed() {
  await prisma.status.createMany({
    data: [
      // estados existentes en Mercadopago:
      { state: 'active' },
      { state: 'pending' },
      { state: 'cancelled' },
      { state: 'disabled' },
      { state: 'approved' },
      { state: 'rejected' },
    ],
  });
  /* await prisma.role.createMany({
    data: [
      {
        role: 'admin',
      },
      {
        role: 'user',
      },
    ],
  }); */
  /* await prisma.category.createMany({
    data: [
      {
        category: 'Bahiana',
        imgTag: 'img/tag_bahiana.jpg',
      },

      {
        category: 'Pizzas',
        imgTag: 'img/tag_pizza.jpeg',
      },

      {
        category: 'Burgers',
        imgTag: 'img/tag_burger.jpeg',
      },

      {
        category: 'Sanguches',
        imgTag: 'img/tag_sambu.jpeg',
      },
    ],
  }); */

  // Borra todas las lineas de la tabla Category
  /* await prisma.$queryRaw`TRUNCATE TABLE "public"."Products" CASCADE;`; */
  /* await prisma.products.createMany({
    data: [
      {
        id: 1,
        name: 'Pizza Tranca',
        imgUrl: '/img/pizza1.jpg',
        categoryId: 1,
        description:
          'Pizza casera a la piedra, muzzarella, jamón, morrón asado, huevo.',
        price: 100,
      },
      {
        id: 2,
        name: 'Pizza Mix',
        imgUrl: '/img/pizza2.jpg',
        categoryId: 1,
        description:
          'Pizza casera a la piedra, muzzarella, jamón, morrón asado, huevo.',
        price: 100,
      },
      {
        id: 3,
        name: 'Vatapa Bomba',
        imgUrl: '/img/vatapa1.jpg',
        categoryId: 2,
        description:
          'Se elabora con pan o harina, jengibre, pimenta-malagueta, castaña de caju, leche de coco, azeite-de-dendê y cebolla.',
        price: 1000,
      },
      {
        id: 4,
        name: 'Caruru Verdão',
        imgUrl: '/img/caruru1.jpg',
        categoryId: 2,
        description:
          'Se prepara con quiabo, una verdura que se cree procede de África, cebolla, camarones frescos y secos, aceite de palma (azeite de dendê), castanha-de-caju tostados y molidos y cacahuetes tostados sin cáscara y molidos.',
        price: 1000,
      },
      {
        id: 5,
        name: 'Acará du Bom',
        imgUrl: '/img/acaraje1.jpg',
        categoryId: 2,
        description:
          'Bollo elaborado con una masa de feijão fradinho y camarones, frito en aceite de dende.',
        price: 800,
      },
      {
        id: 6,
        name: 'Burger Zarpada',
        imgUrl: '/img/burger1.jpg',
        categoryId: 3,
        description:
          'Hamburguesa de asado de 180g, mostaza dulce, cebolla caramelizada, cheddar, aros de cebolla, papas fritas.',
        price: 100,
      },
      {
        id: 7,
        name: 'Sambuchito Verme',
        imgUrl: '/img/sanbu1.jpg',
        categoryId: 4,
        description:
          'Sándwich de milanesa carne o pollo lechuga, tomate, jamón, queso, huevo frito; con papas fritas.',
        price: 100,
      },
      {
        id: 8,
        name: 'Sambuchito Loucão',
        imgUrl: '/img/sanbu2.jpg',
        categoryId: 4,
        description:
          'Sándwich de bife de chorizo, lechuga, tomate, jamón, queso, huevo frito; con papas fritas.',
        price: 100,
      },
      {
        id: 9,
        name: 'Sambuchito Bomba',
        imgUrl: '/img/sanbu1.jpg',
        categoryId: 4,
        description:
          'Sándwich de entraña, lechuga, tomate, jamón, queso, 3 huevo frito; con papas fritas.',
        price: 1000,
      },
      {
        id: 10,
        name: 'Burger Zarpada Prime',
        imgUrl: '/img/burger1.jpg',
        categoryId: 3,
        description:
          'Hamburguesa de asado de 220g, mostaza dulce, bacon, cebolla caramelizada, 3 cheddars, aros de cebolla, papas fritas.',
        price: 100,
      },
    ], 
  }); */
}

seed()
  .then((res) => console.log('res', res))
  .catch((err) => console.log('err', err));
