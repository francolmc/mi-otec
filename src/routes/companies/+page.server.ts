import type { PageServerLoad } from "../$types";
import type CompanyRepository from "../../core/company/company.repository";
import ShowCompaniesUseCase from "../../core/company/show-companies.use-case";
import CompanyTypeOrmRepository from "../../infraestructure/adapters/company.typeorm-repository";

const companyRepository: CompanyRepository = new CompanyTypeOrmRepository();
const showCompanies = new ShowCompaniesUseCase(companyRepository);

export const load: PageServerLoad = async () => {
    const companies = await showCompanies.execute("");

    return {
        props: { companies },
        hydrate: false
    }
}