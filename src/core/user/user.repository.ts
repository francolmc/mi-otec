import type { CreateUserModel, UpdateUserModel, UserModel } from "./user.model";

export default interface UserRepository {
    createUser(user: CreateUserModel): Promise<UserModel>;
    updateUser(id: number, user: UpdateUserModel): Promise<UserModel | null>;
    findUserById(id: number): Promise<UserModel | null>;
    findUserByEmail(email: string): Promise<UserModel | null>;
}