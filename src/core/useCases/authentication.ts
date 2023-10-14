import { AuthenticationService } from "@core/domain/authentication.service";
import { User } from "@core/domain/user";
import { UserRepository } from "@core/domain/user-repository";

export class AuthenticationUseCase {
    constructor(
        private readonly _userRepository: UserRepository,
        private readonly _authService: AuthenticationService
    ) {}

    async login(email: string, password: string): Promise<string | null> {
        const user: User | null = await this._userRepository.findByEmail(email);
        if (!user) return null;
        if (user.password !== password) return null;
        return this._authService.login(email, password);
    }

    async logout(): Promise<void> {}
}