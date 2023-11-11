import type UserModel from "./user.model";

export default interface UserRepository {
    createUser(user: UserModel): Promise<UserModel>;
    updateUser(id: number, user: UserModel): Promise<UserModel | null>;
    findUserById(id: number): Promise<UserModel | null>;
    findUserByEmail(email: string): Promise<UserModel | null>;
}