import { User, UserService } from "@/core/user";

export interface FindUserUseCaseFilter {
    id?: number,
    email?: string
}

export class FindUserUseCase {
    constructor (private readonly _userService: UserService) {}

    public async execute(filter: FindUserUseCaseFilter): Promise<User | null> {
        if (filter.id) return this._userService.findUserById(filter.id);
        if (filter.email) return this._userService.findUserByEmail(filter.email);
        return null;
    }
}