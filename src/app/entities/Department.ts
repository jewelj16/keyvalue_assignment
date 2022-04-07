import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { DepartmentDetails } from "./DepartmentDetails";
import { Employee } from "./Employee";

@Entity("department")
export class Department extends AbstractEntity {
    @PrimaryGeneratedColumn("increment")
    public id: string;

    @Column({ nullable: false })
    public name: string;

    @OneToMany((type) => Employee, (employee) => employee.department)
    @JoinColumn()
    public employee: Employee[];

    @OneToOne((type) => DepartmentDetails, (departmentDetails) => departmentDetails)
    @JoinColumn()
    public departmentDetails: DepartmentDetails;

    @Column({ nullable: true })
    public departmentDetailsId: string;
}
