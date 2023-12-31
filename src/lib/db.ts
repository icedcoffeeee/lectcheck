import { Prisma, PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;
export type ReviewType = Prisma.ReviewGetPayload<true>;
export type LectDBType = Prisma.LectGetPayload<true>;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
