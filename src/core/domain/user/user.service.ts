import { hashPassword } from "../../../utils/encrypt-password.util";
import { User } from "./user";
import { UserRepositoryInterface } from "./user.repository";

export class UserService {
    constructor (
        private readonly _userRepository: UserRepositoryInterface
    ) {}

    public async createUser(user: User): Promise<User> {
        user.password = await hashPassword(user.password);
        const userCreated = this._userRepository.create(user);
        return userCreated; 
    }
}