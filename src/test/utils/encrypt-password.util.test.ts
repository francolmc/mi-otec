import { describe, expect, it, vi } from "vitest";
import bcrypt from "bcrypt"
import { comparePassword, hashPassword } from "../../utils/encrypt-password.util";

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

describe("EncryptPasswordUtil", () => {
    it("Should encrypt password", async () => {
        const result = await hashPassword("password123");
        expect(bcrypt.hash).toHaveBeenCalled();
        expect(result).toBeTruthy();
    })
    it("Should compare passwords", async () => {
        const result = await comparePassword("password123", "password12310")
        expect(bcrypt.compare).toHaveBeenCalled();
        expect(result).toBe(true);
    })
})