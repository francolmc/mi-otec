import type CompanyModel from "./company.model";
import type CompanyRepository from "./company.repository";

export default class ShowCompaniesUseCase {
    constructor (private readonly _companyRepository: CompanyRepository) {}

    public async execute (name?: string): Promise<CompanyModel[]> {
        return this._companyRepository.showCompanies(name);
    }
}