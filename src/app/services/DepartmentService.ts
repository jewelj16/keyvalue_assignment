import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import { DepartmentRepository } from "../repository/DepartmentRepository";

export class DepartmentService {
    constructor(
        private departmentRepository: DepartmentRepository
    ) {}
    public async getAllDepartments() {
        return this.departmentRepository.getAllDepartments();
    }

    public async getAllDepartmentsWithEmployees() {
        return this.departmentRepository.getAllDepartmentWithEmployees();
    }

    public async getAllDepartmentsWithDetails() {
        return this.departmentRepository.getAllDepartmentWithDetails();
    }
}
