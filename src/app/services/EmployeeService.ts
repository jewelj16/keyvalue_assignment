import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import bcrypt from 'bcrypt';
// import e from "express";
import jsonwebtoken from "jsonwebtoken";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import { Address } from "../entities/AddressEntity";




export class EmployeeService {
    constructor(
        private employeeRepository: EmployeeRepository
    ) {}
    public async getAllEmployees() {
        return this.employeeRepository.getAllEmployees();
    }

    public async getEmployeeById(employeeId: string) {
        return this.employeeRepository.getEmployeeById(employeeId);
    }

    public async getEmployeeByIdWithAddr(employeeId: string) {
      return this.employeeRepository.getEmployeeByIdWithAddress(employeeId);
  }
    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                username: employeeDetails.username,
                age: employeeDetails.age,
                password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10): '',
                departmentId: employeeDetails.departmentId,
                isActive: true,
                roleId: employeeDetails.roleId,
                addressId: employeeDetails.address_id
            });
            const save = await this.employeeRepository.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee");
        }
    }

    public async updateEmployee(employeeId: string, employeeDetails: any) {
        // Approach 1
        const updatedEmployee = await this.employeeRepository.updateEmployeeDetails(employeeId, employeeDetails);
        // const updatedEmployee = await this.employeeRepository.
        //                         updateEmployeeDetailsQueryBuilder(employeeId, employeeDetails);
        return updatedEmployee;

        // //Approach 2
        // const employee = await this.getEmployeeById(employeeId);
        // if (!employeeId) {
        //     throw new HttpException(400, `Employee not found`);
        // }

        // employee.name = (employeeDetails.name) ? employeeDetails.name : employee.name;
        // employee.age = (employeeDetails.age) ? employeeDetails.age : employee.age;

        // const updatedEmployee = await this.employeeRepository.saveEmployeeDetails(employee);
        // return updatedEmployee;
    }

    public async deleteEmployee(employeeId: string) {
        return this.employeeRepository.softDeleteEmployeeById(employeeId);
        // return this.employeeRepository.hardDeleteEmployeeById(employeeId);

        // // Hard Remove ( Fetches the entity then deletes it )
        // const employeeDetails = await this.employeeRepository.getEmployeeById(employeeId);
        // return this.employeeRepository.hardRemoveEmployee(employeeDetails);
    }


    public async insertAddress(address: any){
      try {
        const newAddress = plainToClass(Address, {
            place: address.place,
            state: address.state,
            pincode: address.pincode
        });
        const save = await this.employeeRepository.saveAddressDetails(newAddress);
        
        return save;
    } catch (err) {
        throw new HttpException(400, "Failed to Add Address");
    }
    }
    

    public employeeLogin = async (
        username: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepository.getEmployeeByUsername(
          username
        );
        console.log("employeeDetails")

        console.log(username)
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        if (await bcrypt.compare(password, employeeDetails.password)) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:email": employeeDetails.username,
            "customrole": "ain"

          };
          const token = this.generateAuthTokens(payload);
          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

      private generateAuthTokens = (payload: any) => {
          return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
              expiresIn: process.env.ID_TOKEN_VALIDITY,
          });
      };
}
