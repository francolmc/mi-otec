import { User } from "../../../../core/domain/user/user";
import { UserRepository } from "../../../../core/infraestructure/user/user.repository";
import { describe, expect, it } from "vitest";

describe("UserRepository", () => {
    it("Should get user by id", async () => {
        const userRepository = new UserRepository();
        const result = await userRepository.findById(1);
        expect(result).not.toBeNull();
    })
    // it("Should not found user by id", async () => {
    //     const userRepository = new UserRepository();
    //     const result = await userRepository.findById(2);
    //     expect(result).toBeNull();
    // })
    it("Should get user by email", async () => {
        const userRepository = new UserRepository();
        const result = await userRepository.findByEmail("prueba@prueba.com");
        expect(result).not.toBeNull();
    })
    // it("Should not found user by email", async () => {
    //     const userRepository = new UserRepository();
    //     const result = await userRepository.findByEmail("prueba2@prueba.com");
    //     expect(result).toBeNull();
    // })
    it("Should create user", async () => {
        const userRepository = new UserRepository();
        const user: User = {
            id: 1,
            email: "prueba@prueba.com",
            firstName: "prueba",
            lastName: "prueba",
            password: "password123"
        };
        const result = await userRepository.create(user);
        expect(result).not.toBeNull();
    })
})