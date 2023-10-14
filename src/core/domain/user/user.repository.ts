import { User } from "./user";

export interface UserRepositoryInterface {
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<User>;
}