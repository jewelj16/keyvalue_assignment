import { getConnection, Repository } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRepository extends Repository<Department> {
    public async getAllDepartments() {
        const department = getConnection().getRepository(Department);
        return department.find();
    }

    public async getAllDepartmentWithEmployees() {
        const department = getConnection().getRepository(Department);
        return department.find({
            relations: ["employee"]
        });
    }

    public async getAllDepartmentWithDetails() {
        const department = getConnection().getRepository(Department);
        const details = await department.createQueryBuilder("Department").select("DepartmentDetails").innerJoin("Department.departmentDetails", "DepartmentDetails").execute();
        return details;
    }
}
