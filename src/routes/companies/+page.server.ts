import type { PageServerLoad } from "../$types";
import type CompanyRepository from "../../core/company/company.repository";
import ShowCompaniesUseCase from "../../core/company/show-companies.use-case";
import CompanyTypeOrmRepository from "../../infraestructure/adapters/company.typeorm-repository";

const companyRepository: CompanyRepository = new CompanyTypeOrmRepository();
const showCompanies = new ShowCompaniesUseCase(companyRepository);

export const load: PageServerLoad = async ({ url }) => {
    const perPage = 1;
    const currentPage = Number(url.searchParams.get("page")) || 1;
    const search = url.searchParams.get("search") || "";

    try {
        const result = await showCompanies.execute(search, currentPage, perPage);

        return {
            props: { 
                companies: result.companies,
                totalCount: result.count,
                search, 
                currentPage, 
                perPage 
            },
            hydrate: false
        };
    } catch (error) {
        console.error("Error fetching companies:", error);
        return {
            status: 500,
            error: new Error("Internal Server Error")
        };
    }
};
