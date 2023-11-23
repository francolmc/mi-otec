import RUTUtils from "$lib/rut.server";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import CompanyByIdUseCase from "../../../../core/company/company-by-id.use-case";
import type CompanyRepository from "../../../../core/company/company.repository";
import CompanyTypeOrmRepository from "../../../../infraestructure/adapters/company.typeorm-repository";
import type { PageServerLoad } from "./$types";
import UpdateCompanyUseCase from "../../../../core/company/update-company.use-case";

const companyRepository: CompanyRepository = new CompanyTypeOrmRepository();

export const load: PageServerLoad = async ({ params }) => {
    const companyById = new CompanyByIdUseCase(companyRepository);
    const company = await companyById.execute(+params.id);

    return {
        props: { 
            company: {
                rut: `${company?.rut}-${RUTUtils.calcularVerificador(company?.rut.toString() || '')}`,
                name: company?.name,
                address: company?.address,
                email: company?.email
            }
        },
        hydrate: false
    };
}

export const actions: Actions = {
    async default({ params, request }) {
        const data = await request.formData();
        const name = data.get("name");
        const address = data.get("address");
        const email = data.get("email");

        if (
            typeof name !== 'string' ||
            typeof address !== 'string' ||
            typeof email !== 'string' ||
            !name ||
            !address ||
            !email
        ) {
            return fail(400, { invalid: true })
        }
        
        const updatecompany = new UpdateCompanyUseCase(companyRepository);

        try {
            await updatecompany.execute(+(params.id || '0'), {
                name,
                address,
                email
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                return fail(400, { error: true, message: err.message })
            }
            return fail(400, { error: true, message: "Error en el proceso." })
        }

        throw redirect(302, "/companies");
    }
}