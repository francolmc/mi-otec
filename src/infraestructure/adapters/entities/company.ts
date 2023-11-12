import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "company" })
export class Company {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "int" })
    rut?: number;

    @Column({ type: "varchar" })
    name?: string;

    @Column({ type: "varchar" })
    address?: string;

    @Column({ type: "varchar" })
    email?: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}