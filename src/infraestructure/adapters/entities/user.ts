import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar" })
    firstName?: string;

    @Column({ type: "varchar" })
    lastName?: string;

    @Column({ type: "varchar", unique: true })
    email?: string;

    @Column({ type: "varchar" })
    password?: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}