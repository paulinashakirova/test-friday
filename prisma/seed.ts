import { PrismaClient } from '@prisma/client';
import path from 'node:path';

const accountSeedFile = path.join(process.cwd(), '.seeds/accounts.csv');
const categorySeedFile = path.join(process.cwd(), '.seeds/categories.csv');
const transactionsSeedFile = path.join(
  process.cwd(),
  '.seeds/transactions.csv'
);

const prisma = new PrismaClient();

const accountSeed = await prisma.$executeRawUnsafe(`
  COPY "accounts"(id, name, bank)
  FROM ${accountSeedFile}
  DELIMITER ','
  CSV HEADER;
`);
// async function main() {
//   const transactions = await prisma.transactions
// }
