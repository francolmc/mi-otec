import { User, UserService } from "@/core/user";
import { hashPassword } from "../../utils/encrypt.utils";

export default class EditUserUseCase {
    constructor (private readonly _userService: UserService) {}

    public async execute(id: number, user: User): Promise<User | null> {
        if (user.password) {
            user.password = await hashPassword(user.password)
        }
        return this._userService.updateUser(id, user);
    }
}