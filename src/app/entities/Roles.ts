import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./Employee";
@Entity("role")
export class Role extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
    @Column({ nullable: false })
    public role: string;
    @Column({ nullable: true })
    public salary:number;
    @Column({nullable : true})
    public description :string;
    @ManyToMany((type) => Employee, (employee) => employee.role)
    @JoinColumn()
    public employee: Employee[];
}