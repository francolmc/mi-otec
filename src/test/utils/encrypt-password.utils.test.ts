import { comparePassword, hashPassword } from "../.../../../utils/encrypt-password.utils";
import { describe, expect, it } from "vitest";

describe("EncryptPasswordUtil", () => {
    it("Should encrypt the password", async () => {
        const password = "password123";
        const hashedPassword = await hashPassword(password);
        expect(hashedPassword).toBeTruthy();
    })
    it("Should compare the passwords", async () => {
        const password = "password123";
        const hashedPassword = "hashedPassword";
        const isMatch = await comparePassword(password, hashedPassword);
        expect(isMatch).toBe(true);
    })
})