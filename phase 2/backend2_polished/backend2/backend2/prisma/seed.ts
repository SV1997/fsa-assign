import { PrismaClient, Role, RequestStatus } from '@prisma/client';

/*
 * This seed script populates the local SQLite database with a handful of
 * users, equipment and requests. Having some data available makes it
 * easier to develop and verify the API without manually issuing POST
 * requests after every `prisma migrate` run. You can run this script
 * with `npx prisma db seed` (configured in package.json) once the
 * database has been migrated.
 */
const prisma = new PrismaClient();

async function main() {
  // Create users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@college.edu' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@college.edu',
      password: 'password', // plaintext for demo; hash in production
      role: Role.ADMIN,
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@college.edu' },
    update: {},
    create: {
      name: 'Student User',
      email: 'student@college.edu',
      password: 'password',
      role: Role.STUDENT,
    },
  });

  // Create equipment
  const laptop = await prisma.equipment.upsert({
    where: { id: 'equipment-1' },
    update: {},
    create: {
      id: 'equipment-1',
      name: 'Laptop',
      category: 'Electronics',
      condition: 'Good',
      quantity: 10,
      available: 10,
    },
  });

  const projector = await prisma.equipment.upsert({
    where: { id: 'equipment-2' },
    update: {},
    create: {
      id: 'equipment-2',
      name: 'Projector',
      category: 'Electronics',
      condition: 'Excellent',
      quantity: 5,
      available: 5,
    },
  });

  // Create a pending request for demonstration purposes
  await prisma.request.create({
    data: {
      requesterId: student.id,
      equipmentId: laptop.id,
      from: new Date(Date.now() + 24 * 60 * 60 * 1000),
      to: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      status: RequestStatus.PENDING,
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