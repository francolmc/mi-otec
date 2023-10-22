import { User, UserService } from "@/core/user";

export default class ShowUsersUseCase {
    constructor (private readonly _userService: UserService) {}

    public async execute(): Promise<User[]> {
        return this._userService.getAllUsers();
    }
}