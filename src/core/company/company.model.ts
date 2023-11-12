export default interface CompanyModel {
    id?: number;
    rut: number;
    name: string;
    address: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}