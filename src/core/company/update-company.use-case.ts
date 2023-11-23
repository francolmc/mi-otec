import type CompanyModel from "./company.model";
import type CompanyRepository from "./company.repository";

export interface UpdateCompanyInputFields {
    name?: string;
    address?: string;
    email?: string;
}

export default class UpdateCompanyUseCase {
    constructor(private readonly _companyRepository: CompanyRepository) {}

    public async execute(
        id: number,
        { name, email, address }: UpdateCompanyInputFields
    ): Promise<CompanyModel | null> {
        const company = await this._companyRepository.findCompanyById(id);

        if (!company) {
            throw new Error("The company does not exist.");
        }

        const updatedCompany = await this._companyRepository.updateCompany(id, {
            rut: company.rut,
            name: name || company.name,
            address: address || company.address,
            email: email || company.email,
        });

        return updatedCompany;
    }
}
