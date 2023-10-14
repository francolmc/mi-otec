import { User } from "../../../../core/domain/user/user";
import { UserService } from "../../../../core/domain/user/user.service";
import { mockUserRepository } from "../../../../test/mock/user.repository.mock";
import { describe, expect, it, vi } from "vitest";
import bcrypt from "bcrypt";

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

describe("UserService", () => {
    it("Should create user", async () => {
        const userService = new UserService(mockUserRepository);
        const user: User = {
            id: 0,
            email: "prueba@prueba.com",
            firstName: "prueba",
            lastName: "prueba",
            password: "password123"
        };
        const result = await userService.createUser(user);
        expect
        expect(bcrypt.hash).toHaveBeenCalled();
        expect(result.id).toBe(1);
    })
})