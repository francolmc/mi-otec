import { mockUserRepository } from "../../../test/mock/user-repository.mock";
import { AuthenticationUseCase } from "../../../core/useCases/authentication";
import { describe, expect, it } from "vitest";
import { ExternalAuthenticationService } from "../../../core/infraestructure/external-authentication.service";


describe("AuthenticationUseCase", () => {
    it("Deberia poder autenticar a un usuario", async () => {
        const externalAuthenticationService = new ExternalAuthenticationService();
        const authUseCase = new AuthenticationUseCase(mockUserRepository, externalAuthenticationService);
        const result = await authUseCase.login("prueba@prueba.com", "password123");
        expect(result).not.equal(null);
    })
    it("Deberia poder autenticar a un usuario cuyo email no existe", async () => {
        const externalAuthenticationService = new ExternalAuthenticationService();
        const authUseCase = new AuthenticationUseCase(mockUserRepository, externalAuthenticationService);
        const result = await authUseCase.login("prueba2@prueba.com", "password123");
        expect(result).equal(null);
    })
    it("Deberia poder autenticar a un usuario cuya contraseña no es valida", async () => {
        const externalAuthenticationService = new ExternalAuthenticationService();
        const authUseCase = new AuthenticationUseCase(mockUserRepository, externalAuthenticationService);
        const result = await authUseCase.login("prueba@prueba.com", "password1234");
        expect(result).equal(null);
    })
})