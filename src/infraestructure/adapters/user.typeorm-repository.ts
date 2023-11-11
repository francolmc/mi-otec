import TypeOrm from "$lib/db.server";
import type UserModel from "../../core/user/user.model";
import type UserRepository from "../../core/user/user.repository";
import { User } from "./entities";

export default class UserTypeOrmRepository implements UserRepository {
    public async createUser(user: UserModel): Promise<UserModel> {
        const db = await TypeOrm.getDb();
        const userForCreate = new User();
        userForCreate.firstName = user.firstName,
        userForCreate.lastName = user.lastName,
        userForCreate.email = user.email,
        userForCreate.password = user.password;
        const result = await db?.manager.save(userForCreate);

        return this.toModel(result) as UserModel;
    }

    public async updateUser(id: number, user: UserModel): Promise<UserModel | null> {
        const db = await TypeOrm.getDb();
        const userForUpdate = await db?.manager.findOneBy(User, { id });

        if (!userForUpdate) return null;
        
        userForUpdate.firstName = user.firstName || userForUpdate?.firstName,
        userForUpdate.lastName = user.lastName,
        userForUpdate.email = user.email,
        userForUpdate.password = user.password;
        const result = await db?.manager.save(userForUpdate);

        return this.toModel(result) as UserModel;
    }

    public async findUserById(id: number): Promise<UserModel | null> {
        const db = await TypeOrm.getDb();
        const result = await db?.manager.findOneBy(User, { id });

        if (!result) return null;

        return this.toModel(result);
    }

    public async findUserByEmail(email: string): Promise<UserModel | null> {
        const db = await TypeOrm.getDb();
        const result = await db?.manager.findOneBy(User, { email });

        if (!result) return null;

        return this.toModel(result);
    }

    private toModel(user: User | undefined | null): UserModel | null {
        if (!user) return null;
        return {
            id: user.id,
            firstName: user.firstName as string,
            lastName: user.lastName as string,
            email: user.email as string,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
}