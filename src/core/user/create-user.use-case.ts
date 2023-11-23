import PasswordHash from "$lib/password-hash";
import type { UserModel } from "./user.model";
import type UserRepository from "./user.repository";

export interface CreateUserInputFields {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default class CreateUserUseCase {
    constructor (private readonly _userRepository: UserRepository) {}

    public async excute ({ firstName, lastName, email, password }: CreateUserInputFields): Promise<UserModel> {
        const user = await this._userRepository.findUserByEmail(email);

        if (user) throw new Error("The user already exist.");
        
        if (password) {
            password = await PasswordHash.encrypt(password);
        }

        const createdUser = await this._userRepository.createUser({
            firstName,
            lastName,
            email,
            password
        });

        return createdUser;
    }
}