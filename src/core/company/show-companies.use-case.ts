import type CompanyModel from "./company.model";
import type CompanyRepository from "./company.repository";

export default class ShowCompaniesUseCase {
    constructor(private readonly _companyRepository: CompanyRepository) {}

    public async execute(
        name?: string,
        page?: number,
        perPage?: number
    ): Promise<{ companies: CompanyModel[]; count: number }> {
        return this._companyRepository.showCompanies(name, page, perPage);
    }
}
