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

const generateAmmos = (number: number) => {
  const ammos = [];
  while (number >= 1) {
    ammos.unshift({
      id: faker.random.alphaNumeric(30),
      name: faker.random.words(3),
      image: faker.internet.url(),
      description: faker.lorem.sentences(2),
      category: faker.commerce.product(),
      weight: faker.datatype.float({ max: 10 }),
    });
    number--;
  }
  return ammos;
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

const generateAshes = (number: number) => {
  const ashes = [];
  while (number >= 1) {
    ashes.unshift({
      id: faker.random.alphaNumeric(30),
      name: faker.random.words(3),
      image: faker.internet.url(),
      description: faker.lorem.sentences(2),
      affinity: faker.commerce.productMaterial(),
      skill: faker.random.words(1),
    });
    number--;
  }
  return ashes;
};

const generateItems = (number: number) => {
  const items = [];
  while (number >= 1) {
    items.unshift({
      id: faker.random.alphaNumeric(30),
      name: faker.random.words(3),
      image: faker.internet.url(),
      description: faker.lorem.sentences(2),
      type: faker.commerce.productMaterial(),
      effect: faker.lorem.sentences(1),
    });
    number--;
  }
  return items;
};

const generateShields = (number: number) => {
  const shields = [];
  while (number >= 1) {
    shields.unshift({
      id: faker.random.alphaNumeric(30),
      name: faker.random.words(3),
      image: faker.internet.url(),
      description: faker.lorem.sentences(2),
      category: faker.commerce.product(),
      weight: faker.datatype.float({ max: 10 }),
    });
    number--;
  }
  return shields;
};

const generateTalismans = (number: number) => {
  const talismans = [];
  while (number >= 1) {
    talismans.unshift({
      id: faker.random.alphaNumeric(30),
      name: faker.random.words(3),
      image: faker.internet.url(),
      description: faker.lorem.sentences(2),
      effects: faker.lorem.sentences(1),
    });
    number--;
  }
  return talismans;
};

const generateWeapons = (number: number) => {
  const weapons = [];
  while (number >= 1) {
    weapons.unshift({
      id: faker.random.alphaNumeric(30),
      name: faker.random.words(3),
      image: faker.internet.url(),
      description: faker.lorem.sentences(2),
      category: faker.commerce.product(),
      weight: faker.datatype.float({ max: 10 }),
    });
    number--;
  }
  return weapons;
};

fs.writeFileSync(
  './db.json',
  JSON.stringify({
    User: generateUsers(100),
    Ammos: generateAmmos(100),
    Armors: generateArmors(100),
    Ashes: generateAshes(100),
    Items: generateItems(100),
    Shields: generateShields(100),
    Talismans: generateTalismans(100),
    Weapons: generateWeapons(100),
  }),
);
