export interface AuthenticationService {
    login(email: string, password: string): Promise<string | null>;
    logout(): Promise<void>;
}