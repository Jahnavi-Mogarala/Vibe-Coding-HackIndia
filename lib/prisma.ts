import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient(): PrismaClient {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query"] : [],
    });
  } catch (e) {
    // Return a proxy that throws on any method call — handled by API route try/catch blocks
    return new Proxy({} as PrismaClient, {
      get() {
        throw new Error("Prisma client failed to initialize — no DATABASE_URL configured");
      },
    });
  }
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
