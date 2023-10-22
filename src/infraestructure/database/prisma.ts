import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

const closePrisma = () => {
    if (globalForPrisma.prisma) {
        globalForPrisma.prisma.$disconnect();
    }
}

process.on("uncaughtException", (error) => {
    console.error("Uncaught exception:", error);
    closePrisma();
    process.exit(1);
})

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;