import { User, UserRepository } from "@/core/user";

export const userRepositoryMock: UserRepository = {
    create: function(entity: User): Promise<User> {
        return Promise.resolve({...entity, id: 1});
    },
    findByEmail: function (email: string): Promise<User | null> {
        if (email === "prueba@prueba.com") {
            return Promise.resolve({
                id: 1,
                email: "prueba@prueba.com",
                firstName: "Prueba",
                lastName: "Prueba",
                password: "password12310"
            });
        }
        return Promise.resolve(null);
    },
    getAll: function (): Promise<User[]> {
        return Promise.resolve([{
            id: 1,
            email: "prueba@prueba.com",
            firstName: "Prueba",
            lastName: "Prueba",
            password: "password12310"
        }]);
    },
    update: function (id: number, entity: User): Promise<User | null> {
        if (id === 1) {
            return Promise.resolve({...entity, id: 1});
        }
        return Promise.resolve(null);
    },
    delete: function (id: number): Promise<User | null> {
        if (id === 1) {
            return Promise.resolve({
                id: 1,
                email: "prueba@prueba.com",
                firstName: "Prueba",
                lastName: "Prueba",
                password: "password12310"
            })
        }
        return Promise.resolve(null);
    },
    findById: function (id: number): Promise<User | null> {
        if (id === 1) {
            return Promise.resolve({
                id: 1,
                email: "prueba@prueba.com",
                firstName: "Prueba",
                lastName: "Prueba",
                password: "password12310"
            });
        }
        return Promise.resolve(null);
    }
};