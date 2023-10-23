import { describe, expect, it, vi } from "vitest";
import { EditUserUseCase } from "..";
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
    updateUser: (id: number, user: User): Promise<User | null> => {
        if (id === 1)
            return Promise.resolve({...user, id});
        return Promise.resolve(null);
    }
}

const editUserUseCase = new EditUserUseCase(userServiceMock as UserService);

describe("EditUserUseCase", () => {
    it("Should edit user", async () => {
        const result = await editUserUseCase.execute(1, userData);

        expect(result?.id).toBe(1);
        expect(result?.password).toBe("password12310")
    })

    it("Should edit user but not exist", async () => {
        const result = await editUserUseCase.execute(2, userData);

        expect(result).toBeNull();
    })
})