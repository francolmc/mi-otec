import { fail, type Actions, redirect } from "@sveltejs/kit";
import type CompanyRepository from "../../../core/company/company.repository";
import CompanyTypeOrmRepository from "../../../infraestructure/adapters/company.typeorm-repository";
import CreateCompanyUseCase from "../../../core/company/create-company.use-case";

export const actions: Actions = {
    async default({ request }) {
        const data = await request.formData();
        const rut = data.get("rut");
        const name = data.get("name");
        const address = data.get("address");
        const email = data.get("email");

        if (
            typeof rut !== 'string' ||
            typeof name !== 'string' ||
            typeof address !== 'string' ||
            typeof email !== 'string' ||
            !rut ||
            !name ||
            !address ||
            !email
        ) {
            return fail(400, { invalid: true })
        }

        const companyRepository: CompanyRepository = new CompanyTypeOrmRepository();
        const createCompany = new CreateCompanyUseCase(companyRepository);

        const rutNumber = rut.split("-");
        try {
            await createCompany.execute({ rut: +rutNumber[0], name, address, email });
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                return fail(400, { error: true, message: err.message });
            }
            return fail(400, { error: true, message: "Error en el proceso." })
        }
        
        throw redirect(302, "/companies");
    },
};