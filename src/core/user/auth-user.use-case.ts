import PasswordHash from "$lib/password-hash";
import type UserRepository from "./user.repository";

export default class AuthUserUseCase {
    constructor (private readonly _userRepository: UserRepository) {}

    public async execute (email: string, password: string): Promise<boolean> {
        const user = await this._userRepository.findUserByEmail(email);

        if (!user) return false;

        const passwordMatch = await PasswordHash.compare(password, user.password || '');

        if (!passwordMatch) return false;

        return true;
    }
}