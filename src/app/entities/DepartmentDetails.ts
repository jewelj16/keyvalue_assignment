import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";

@Entity("departmentDetails")
export class DepartmentDetails extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public departmentRoom: string;

    @Column({ nullable: true })
    public departmentCode: string;

    @Column({ nullable: true })
    public website: string;
}
