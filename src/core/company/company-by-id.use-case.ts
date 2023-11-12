import type CompanyModel from "./company.model";
import type CompanyRepository from "./company.repository";

export default class CompanyByIdUseCase {
    constructor (private readonly _companyRepository: CompanyRepository) {}

    public async execute (id: number): Promise<CompanyModel | null> {
        const company = await this._companyRepository.findCompanyById(id);

        if (!company) throw new Error("The company not exist.");
        
        return company;
    }
}