import { AuthenticationService } from "@core/domain/authentication.service";
import { User } from "@core/domain/user";
import { UserRepository } from "@core/domain/user-repository";

export class ExternalAuthenticationService implements AuthenticationService {
    public async login(email: string, password: string): Promise<string | null> {
        return "";
    }

    public async logout(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}