import { describe, expect, it } from "vitest";
import { RemoveUserUseCase } from "..";
import { User, UserService } from "../../../core/user";

const userData: User = {
    firstName: "Prueba",
    lastName: "Prueba",
    email: "prueba@prueba.com",
    password: "password123"
};

const userServiceMock = {
    deleteUser: (id: number): Promise<User | null> => {
        if (id === 1)
            return Promise.resolve({ ...userData, id });
        return Promise.resolve(null);
    }
}

const removeUserUseCase = new RemoveUserUseCase(userServiceMock as UserService);

describe("RemoveUserUseCase", () => {
    it("Should remove user", async () => {
        const result = await removeUserUseCase.execute(1);

        expect(result?.id).toBe(1);
    })

    it("Should remove user but not exist", async () => {
        const result = await removeUserUseCase.execute(2);

        expect(result).toBeNull();
    })
})