import { User, UserService } from "@/core/user";

export default class RemoveUserUseCase {
    constructor (private readonly _userService: UserService) {}

    public async execute(id: number): Promise<User | null> {
        return this._userService.deleteUser(id);
    }
}