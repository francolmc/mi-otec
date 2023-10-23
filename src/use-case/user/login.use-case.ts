import { UserService } from "../../core/user";
import { comparePassword } from "../../utils/encrypt.utils";
import jwt from "jsonwebtoken";

export default class LoginUseCase {
    constructor(private readonly _userService: UserService) { }

    public async execute(email: string, password: string): Promise<string | null> {
        const user = await this._userService.findUserByEmail(email);
        if (!user) {
            return null;
        }
        const isMatchPassword = await comparePassword(password, user.password);
        if (!isMatchPassword) {
            return null;
        }
        const secretKey = process.env.SECRET_KEY as string;
        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' })
        return token;
    }
}