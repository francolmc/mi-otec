import { describe, expect, it } from "vitest";
import { FindUserUseCase } from "..";
import { User, UserService } from "../../../core/user";

const userData: User = {
    firstName: "Prueba",
    lastName: "Prueba",
    email: "prueba@prueba.com",
    password: "password123"
};

const userServiceMock = {
    findUserById: (id: number): Promise<User | null> => {
        if (id === 1)
            return Promise.resolve(userData);
        return Promise.resolve(null);
    },
    findUserByEmail: (email: string): Promise<User | null> => {
        if (email === "prueba@prueba.com")
            return Promise.resolve(userData);
        return Promise.resolve(null);
    }
}

const findUserUseCase = new FindUserUseCase(userServiceMock as UserService);

describe("FindUserUseCase", () => {
    it("Should find user by id", async () => {
        const result = await findUserUseCase.execute({id: 1});

        expect(result).not.toBeNull();
    })

    it("Should find user by id but not exist", async () => {
        const result = await findUserUseCase.execute({id: 2});

        expect(result).toBeNull();
    })

    it("Should find user by email", async () => {
        const result = await findUserUseCase.execute({email: "prueba@prueba.com"});

        expect(result).not.toBeNull();
    })

    it("Should find user by email but not exist", async () => {
        const result = await findUserUseCase.execute({email: "prueba2@prueba.cl"});

        expect(result).toBeNull();
    })
})