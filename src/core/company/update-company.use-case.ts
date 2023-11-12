import type CompanyRepository from "./company.repository";

export interface UpdateCompanyInputFields {
    name?: string;
    address?: string;
    email?: string;
}

export default class UpdateCompanyUseCase {
    constructor (private readonly _companyRepository: CompanyRepository) {}

    public async execute (id: number, { name, email, address }: UpdateCompanyInputFields) {
        const company = await this._companyRepository.findCompanyById(id);

        if (!company) throw new Error("The company not exist.");

        return this._companyRepository.updateCompany(id, {
            rut: company.rut,
            name: name || company.name,
            address: address || company.address,
            email: email || company.email
        });
        
    }
}