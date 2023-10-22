import { describe, expect, it, vi } from "vitest";
import { CreateUserUseCase } from "..";
import { User, UserService } from "../../../core/user";

vi.mock("bcrypt", () => {
    return {
        default: {
            hash: vi.fn().mockImplementation((password: string, saltRounds: number) => {
                return `${password}${saltRounds}`;
            }),
            compare: vi.fn().mockImplementation((password: string, hash: string) => {
                return password === hash.slice(0, -2);
            })
        }
    }
})

const userData: User = {
    firstName: "Prueba",
    lastName: "Prueba",
    email: "prueba@prueba.com",
    password: "password123"
};

const userServiceMock = {
    createUser: (user: User): Promise<User> => {
        return Promise.resolve({...user, id: 1});
    }
}

const createUserUseCase = new CreateUserUseCase(userServiceMock as UserService);

describe("CreateUserUseCase", () => {
    it("Should create user and encrypt password", async () => {
        const result = await createUserUseCase.execute(userData);

        expect(result.id).toBe(1);
        expect(result.password).toBe("password12310");
    })
})