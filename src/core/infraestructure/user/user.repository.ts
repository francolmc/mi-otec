import { User } from "@core/domain/user/user";
import { UserRepositoryInterface } from "@core/domain/user/user.repository";

export class UserRepository implements UserRepositoryInterface {
    public async findById(id: number): Promise<User | null> {
        const user: User = {
            id: 1,
            email: "prueba@prueba.com",
            firstName: "prueba",
            lastName: "prueba",
            password: "password123"
        };
        return user;
    }
    
    public async findByEmail(email: string): Promise<User | null> {
        const user: User = {
            id: 1,
            email: "prueba@prueba.com",
            firstName: "prueba",
            lastName: "prueba",
            password: "password123"
        };
        return user;
    }

    public async create(user: User): Promise<User> {
        const userCreated: User = {
            id: 1,
            email: "prueba@prueba.com",
            firstName: "prueba",
            lastName: "prueba",
            password: "password123"
        };
        return userCreated;
    }
}