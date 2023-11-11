import type UserRepository from "./user.repository";

export interface UserFields {
    id: number,
    firstName: string,
    lastName: string,
    email: string
}

export default class GetUserByEmailUseCase {
    constructor (private readonly _userRepository: UserRepository) {}

    public async execute (email: string): Promise<UserFields | null> {
        const user = await this._userRepository.findUserByEmail(email);

        if (!user) return null;

        return {
            id: user.id || 0,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
    }
}