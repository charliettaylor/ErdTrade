import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database...');
  await prisma.user.deleteMany();
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;

  console.log('Seeding!');
  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
