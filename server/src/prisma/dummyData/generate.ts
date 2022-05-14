import { faker } from '@faker-js/faker';
import * as fs from 'fs';

const generateUsers = (number: number) => {
  const users = [];
  while (number >= 1) {
    users.unshift({
      id: number,
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
    number--;
  }
  return users;
};

const generateArmors = (number: number) => {
  const armors = [];
  while (number >= 1) {
    armors.unshift({
      id: faker.random.alphaNumeric(30),
      name: faker.random.words(3),
      image: faker.internet.url(),
      description: faker.lorem.sentences(2),
      category: faker.commerce.product(),
      weight: faker.datatype.float({ max: 10 }),
    });
    number--;
  }
  return armors;
};

fs.writeFileSync(
  './db.json',
  JSON.stringify({ User: generateUsers(100), Armors: generateArmors(100) }),
);
