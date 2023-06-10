import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seed() {
  await prisma.role.createMany({
    data: [
      {
        role: 'admin',
      },
      {
        role: 'user',
      },
    ],
  });
}

seed()
  .then((res) => console.log('res', res))
  .catch((err) => console.log('err', err));
