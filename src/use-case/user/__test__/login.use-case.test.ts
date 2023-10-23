import { describe, expect, it, vi } from "vitest";
import { User, UserService } from "../../../core/user";
import { LoginUseCase } from "..";

vi.mock("jsonwebtoken", () => {
    return {
        default: {
            sign: () => "123456",
        }
    }
})

vi.mock("bcrypt", () => {
    return {
        default: {
            compare: (password: string, hash: string) => {
                if (password === "password12310")
                    return true;
                return false;
            },
        }
    }
})

const userData: User = {
    firstName: "Prueba",
    lastName: "Prueba",
    email: "prueba@prueba.com",
    password: "password12310"
};

const userServiceMock = {
    findUserByEmail: (email: string): Promise<User | null> => {
        if (email === "prueba@prueba.com")
            return Promise.resolve({ ...userData, id: 1 });
        return Promise.resolve(null);
    }
}

const loginUseCase = new LoginUseCase(userServiceMock as UserService);

describe("LoginUseCase", () => {
    it("Should auth user", async () => {
        const result = await loginUseCase.execute("prueba@prueba.com", "password12310");
        
        expect(result).not.toBeNull();
    })

    it("Should auth user failed mail", async () => {
        const result = await loginUseCase.execute("prueba2@prueba.com", "password12310");

        expect(result).toBeNull();
    })

    it("Should auth user failed password", async () => {
        const result = await loginUseCase.execute("prueba@prueba.com", "password123");

        expect(result).toBeNull();
    })
})