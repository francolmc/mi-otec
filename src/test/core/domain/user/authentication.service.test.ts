import { AuthenticationService } from "../../../../core/domain/user/authentication.service";
import { mockUserRepository } from "../../../mock/user.repository.mock";
import { describe, expect, it, vi } from "vitest";

vi.mock("bcrypt", () => {
    return {
        default: {
            hash: vi.fn().mockImplementation((password: string, saltRounds: number) => {
                return password + saltRounds;
            }),
            compare: vi.fn().mockImplementation((password: string, hash: string) => {
                return password === hash.slice(0, -2);
            })
        }
    }
})

describe("AuthenticationService", () => {
    it("Should authenticate user", async () => {
        const authenticationService = new AuthenticationService(mockUserRepository);
        const result = await authenticationService.login("prueba@prueba.com", "password123");
        expect(result).toBe(true);
    })
    it("Should failed authenticate user by email", async () => {
        const authenticationService = new AuthenticationService(mockUserRepository);
        const result = await authenticationService.login("prueba2@prueba.com", "password123");
        expect(result).toBe(false);
    })
    it("Should failed authenticate user by password", async () => {
        const authenticationService = new AuthenticationService(mockUserRepository);
        const result = await authenticationService.login("prueba@prueba.com", "password1234");
        expect(result).toBe(false);
    })
})