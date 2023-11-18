import TypeOrm from "$lib/db.server";
import { Like } from "typeorm";
import type CompanyModel from "../../core/company/company.model";
import type CompanyRepository from "../../core/company/company.repository";
import { Company } from "./entities";

export default class CompanyTypeOrmRepository implements CompanyRepository {
    public async findCompanyById(id: number): Promise<CompanyModel | null> {
        const db = await TypeOrm.getDb();
        const result = await db?.manager.findOneBy(Company, { id });

        if (!result) return null;

        return this.toModel(result);
    }

    public async findCompanyByRut(rut: number): Promise<CompanyModel | null> {
        const db = await TypeOrm.getDb();
        const result = await db?.manager.findOneBy(Company, { rut });

        if (!result) return null;

        return this.toModel(result);
    }
    
    public async showCompanies(name?: string, page?: number, perPage?: number): Promise<{ companies: CompanyModel[], count: number }> {
        const db = await TypeOrm.getDb();
        const skip = page && perPage ? (page - 1) * perPage : 0;
        const result = await db?.manager.findAndCount(Company, { where: { name: Like(`${name}%`) }, skip, take: perPage });

        if (!result) return { companies: [], count: 0 };

        return { 
            companies: result[0]?.map((item) => {
                return this.toModel(item) as CompanyModel;
            }), 
            count: result[1]};
    }
    
    public async createCompany(company: CompanyModel): Promise<CompanyModel> {
        const db = await TypeOrm.getDb();
        const companyForCreate = new Company();
        companyForCreate.rut = company.rut;
        companyForCreate.name = company.name;
        companyForCreate.address = company.address;
        companyForCreate.email = company.email;

        const result = await db?.manager.save(companyForCreate);

        return this.toModel(result) as CompanyModel;
    }
    
    public async updateCompany(id: number, company: CompanyModel): Promise<CompanyModel | null> {
        const db = await TypeOrm.getDb();
        const companyForUpdate = await db?.manager.findOneBy(Company, { id });

        if (!companyForUpdate) return null;

        companyForUpdate.rut = company.rut;
        companyForUpdate.name = company.name;
        companyForUpdate.address = company.address;
        companyForUpdate.email = company.email;

        const result = await db?.manager.save(companyForUpdate);

        return this.toModel(result);
    }
 
    private toModel(company: Company | undefined | null): CompanyModel | null {
        if (!company) return null;

        return {
            id: company.id,
            rut: company.rut as number,
            name: company.name as string,
            address: company.address as string,
            email: company.email as string,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt
        };
    }
}