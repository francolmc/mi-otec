import { User, UserRepository } from "@/core/user";
import prisma from "./prisma";

export default class UserPrismaRepository implements UserRepository {
    public async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({ where: { email } });

        return user;
    }

    public async getAll(): Promise<User[]> {
        const result = await prisma.user.findMany();

        return result;
    }

    public async create(entity: User): Promise<User> {
        const result = await prisma.user.create({
            data: entity
        });

        return result;
    }

    public async update(id: number, entity: User): Promise<User | null> {
        const result = await prisma.user.update({
            data: entity,
            where: { id }
        });

        return result;
    }

    public async delete(id: number): Promise<User | null> {
        const result = await prisma.user.delete({ where: { id } });

        return result;
    }

    public async findById(id: number): Promise<User | null> {
        const result = await prisma.user.findFirst({ where: { id } });

        return result;
    }
    
}