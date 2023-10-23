import { describe, expect, it, vi } from "vitest";
import { VerifyTokenUseCase } from "..";

vi.mock("jsonwebtoken", () => {
    return {
        default: {
            verify: (inputToken: string, secretKey: string) => {
                if (inputToken === "123456")
                    return "{}";
                throw Error("Is not valid.");
            },
        }
    }
})

const verifyTokenUseCase = new VerifyTokenUseCase();

describe("LoginUseCase", () => {
    it("Should validate token success", async () => {
        const result = await verifyTokenUseCase.execute("123456");

        expect(result).toBe(true);
    })

    it("Should validate token failed", async () => {
        const result = await verifyTokenUseCase.execute("");

        expect(result).toBe(false);
    })
})