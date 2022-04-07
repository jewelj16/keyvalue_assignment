import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";

@Entity("projects")
export class Projects extends AbstractEntity {

@PrimaryGeneratedColumn("uuid")
public projectid: string;

@Column({nullable:true})
public name: string;

//@Column({nullable: true})
// public description: string

@Column({default:true})
public isActive: boolean;


}
