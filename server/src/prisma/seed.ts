import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding!');

  await prisma.ammos.create({
    data: {
      id: '17f69448ceel0i0a57bokoqz409yb',
      name: 'Firebone Arrow',
      image:
        'https://eldenring.fanapis.com/images/ammos/17f69448ceel0i0a57bokoqz409yb.png',
      description:
        'Arrow whittled from animal bones. The tip is set alight before firing',
      type: 'Pierce',
      passive: 'Causes blood loss build up (55)',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
