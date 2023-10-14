import { ExternalAuthenticationService } from "../../../core/infraestructure/external-authentication.service";
import { describe, expect, it } from "vitest";

describe("ExternalAuthenticationService", () => {
    it("Deberia validar un usuario y obtener un JWT", async () => {
        const externalAuthenticationService = new ExternalAuthenticationService();
        const result = await externalAuthenticationService.login("prueba@prueba.com", "password123");
        expect(result).not.equal(null);
    })
})