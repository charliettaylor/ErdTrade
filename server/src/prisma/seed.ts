import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Deletes all the data in each of the tables and resets row ID
async function truncateDatabase() {
  const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name);

  return Promise.all(
    modelNames.map(
      (table) =>
        prisma.$executeRaw`TRUNCATE TABLE "${Prisma.raw(
          table,
        )}" RESTART IDENTITY CASCADE`,
    ),
  );
}

// Seeds database with faker data
async function seedDatabase() {
  console.log('Clearing database...');
  truncateDatabase();

  console.log('Seeding!');
  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      },
    });

    await prisma.ammos.create({
      data: {
        id: faker.random.alphaNumeric(30),
        name: faker.random.words(3),
        image: faker.internet.url(),
        description: faker.lorem.sentences(2),
        type: faker.commerce.productMaterial(),
        passive: faker.lorem.sentences(1),
      },
    });

    await prisma.armors.create({
      data: {
        id: faker.random.alphaNumeric(30),
        name: faker.random.words(3),
        image: faker.internet.url(),
        description: faker.lorem.sentences(2),
        category: faker.commerce.product(),
        weight: faker.datatype.float({ max: 10 }),
      },
    });

    await prisma.ashes.create({
      data: {
        id: faker.random.alphaNumeric(30),
        name: faker.random.words(3),
        image: faker.internet.url(),
        description: faker.lorem.sentences(2),
        affinity: faker.commerce.productMaterial(),
        skill: faker.random.words(1),
      },
    });

    await prisma.items.create({
      data: {
        id: faker.random.alphaNumeric(30),
        name: faker.random.words(3),
        image: faker.internet.url(),
        description: faker.lorem.sentences(2),
        type: faker.commerce.productMaterial(),
        effect: faker.lorem.sentences(1),
      },
    });

    await prisma.shields.create({
      data: {
        id: faker.random.alphaNumeric(30),
        name: faker.random.words(3),
        image: faker.internet.url(),
        description: faker.lorem.sentences(2),
        category: faker.commerce.product(),
        weight: faker.datatype.float({ max: 10 }),
      },
    });

    await prisma.talismans.create({
      data: {
        id: faker.random.alphaNumeric(30),
        name: faker.random.words(3),
        image: faker.internet.url(),
        description: faker.lorem.sentences(2),
        effects: faker.lorem.sentences(1),
      },
    });

    await prisma.weapons.create({
      data: {
        id: faker.random.alphaNumeric(30),
        name: faker.random.words(3),
        image: faker.internet.url(),
        description: faker.lorem.sentences(2),
        category: faker.commerce.product(),
        weight: faker.datatype.float({ max: 10 }),
      },
    });
  }
}

seedDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
