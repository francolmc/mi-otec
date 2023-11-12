import type CompanyModel from "./company.model";
import type CompanyRepository from "./company.repository";

export interface CreateCompanyInputFields {
    rut: number;
    name: string;
    address: string;
    email: string;
}

export default class CreateCompanyUseCase {
    constructor (private readonly _companyRepository: CompanyRepository) {}

    public async execute ({ rut, name, address, email }: CreateCompanyInputFields): Promise<CompanyModel> {
        const company = await this._companyRepository.findCompanyByRut(rut);

        if (company) throw new Error("The company already exist.");
        
        return this._companyRepository.createCompany({
            rut,
            name,
            address,
            email
        });
    }
}