import { User, UserService } from "@/core/user";
import { hashPassword } from "../../utils/encrypt.utils";

export default class CreateUserUseCase {
    constructor (private readonly _userService: UserService) {}

    public async execute(user: User): Promise<User> {
        user.password = await hashPassword(user.password);
        return this._userService.createUser(user);
    }
}