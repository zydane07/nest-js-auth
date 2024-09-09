import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// async function main() {
//   // ... you will write your Prisma Client queries here
// }

const main = async () => {
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      email: 'zydane@gmail.co.id',
      name: 'Muhammad Zydane',
      password: await bcrypt.hash('123456', 10),
      role: 'ADMIN',
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
