import type CompanyModel from "./company.model";

export default interface CompanyRepository {
    findCompanyById(id: number): Promise<CompanyModel | null>;
    findCompanyByRut(rut: number): Promise<CompanyModel | null>;
    showCompanies(name?: string): Promise<CompanyModel[]>;
    createCompany(company: CompanyModel): Promise<CompanyModel>;
    updateCompany(id: number, company: CompanyModel): Promise<CompanyModel | null>;
}