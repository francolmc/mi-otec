import { User } from "@core/domain/user/user";
import { UserRepository } from "@core/infraestructure/user/user.repository";

export const mockUserRepository: UserRepository = {
    findById: async (id: number) => {
        if (id === 1) {
            return {
                id: 1,
                email: "prueba@prueba.com",
                firstName: "pueba",
                lastName: "prueba",
                password: "password123"
            }
        }
        return null;
    },
    findByEmail: async (email: string) => {
        if (email === "prueba@prueba.com") {
            return {
                id: 1,
                email: "prueba@prueba.com",
                firstName: "pueba",
                lastName: "prueba",
                password: "password12310"
            }
        }
        return null;
    },
    create: async (user: User) => {
        return {...user, id: 1};
    }
}