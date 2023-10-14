import { comparePassword } from "../../../utils/encrypt-password.util";
import { UserRepositoryInterface } from "./user.repository";

export class AuthenticationService {
    constructor(
        private readonly _userRepository: UserRepositoryInterface
    ) {}

    public async login(email: string, password: string): Promise<boolean> {
        const user = await this._userRepository.findByEmail(email);
        if (!user) return false;
        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) return false;
        return true;
    }
}