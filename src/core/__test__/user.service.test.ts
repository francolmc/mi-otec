import { describe, expect, it } from "vitest";
import { UserService, type User } from "../user";
import { userRepositoryMock } from "../../mock/user-repository.mock";

describe("UserService", () => {
    it("Should create user", async () => {
        const userService = new UserService(userRepositoryMock);
        const result = await userService.createUser({
            email: "prueba@prueba.com",
            firstName: "Prueba",
            lastName: "Prueba",
            password: "password12310"
        });
        expect(result.id).toBe(1);
    })

    it("Should edit user", async () => {
        const userService = new UserService(userRepositoryMock);
        const result = await userService.updateUser(1, {
            email: "prueba@prueba.com",
            firstName: "Prueba",
            lastName: "Prueba",
            password: "password12310"
        });
        expect(result?.id).toBe(1);
    })

    it("Should edit invalid user", async () => {
        const userService = new UserService(userRepositoryMock);
        const result = await userService.updateUser(2, {
            email: "prueba@prueba.com",
            firstName: "Prueba",
            lastName: "Prueba",
            password: "password12310"
        });
        expect(result).toBeNull();
    })

    it("Should find user with email", async () => {
        const userService = new UserService(userRepositoryMock);
        const result = await userService.findUserByEmail("prueba@prueba.com");
        expect(result?.id).toBe(1);
    })

    it("Should find user with email but not exist", async () => {
        const userService = new UserService(userRepositoryMock);
        const result = await userService.findUserByEmail("prueba2@prueba.cl");
        expect(result).toBeNull()
    })

    it("Should get all users", async () => {
        const userService = new UserService(userRepositoryMock);
        const result = await userService.getAllUsers();
        expect(result.length).toBeGreaterThanOrEqual(1);
    })

    it("Should find user by id", async () => {
        const userService = new UserService(userRepositoryMock);
        const result = await userService.findUserById(1);
        expect(result).not.toBeNull();
    })

    it("Should find user by id but not exist", async () => {
        const userService = new UserService(userRepositoryMock);
        const result = await userService.findUserById(2);
        expect(result).toBeNull();
    })

    it("Should delete user by id", async () => {
        const userService = new UserService(userRepositoryMock);
        const result = await userService.deleteUser(1);
        expect(result).not.toBeNull();
    })

    it("Should delete user by id but not exist", async () => {
        const userService = new UserService(userRepositoryMock);
        const result = await userService.deleteUser(2);
        expect(result).toBeNull();
    })
})