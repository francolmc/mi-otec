import { describe, expect, it } from "vitest";
import { ShowUsersUseCase } from "..";
import { User, UserService } from "../../../core/user";

const userData: User = {
    firstName: "Prueba",
    lastName: "Prueba",
    email: "prueba@prueba.com",
    password: "password123"
};

const userServiceMock = {
    getAllUsers: (): Promise<User[]> => {
        return Promise.resolve([userData]);
    }
}

const showUserUseCase = new ShowUsersUseCase(userServiceMock as UserService);

describe("ShowUsersUseCase", () => {
    it("Should show users", async () => {
        const result = await showUserUseCase.execute();

        expect(result.length).toBeGreaterThan(0);
    })
})