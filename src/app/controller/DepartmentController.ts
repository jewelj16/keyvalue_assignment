import { NextFunction, Response } from "express";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../services/DepartmentService";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";
/**
 * Implementation of the EmployeeController route.
 *
 */
class DepartmentController extends AbstractController {

  constructor(
    private departmentService: DepartmentService
  ) {
    super(`${APP_CONSTANTS.apiPrefix}/departments`);
    this.initializeRoutes();
  }

  protected initializeRoutes = (): void => {
    this.router.get(
      `${this.path}`,
      this.asyncRouteHandler(this.getAllDepartments)
    );
    this.router.get(
      `${this.path}/employees`,
      this.asyncRouteHandler(this.getAllDepartmentsWithEmployees)
    );
    this.router.get(
      `${this.path}/details`,
      this.asyncRouteHandler(this.getAllDeparmentWithDetails)
    );
  }

  private getAllDepartments = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const data = await this.departmentService.getAllDepartments();
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
    );
  }

  private getAllDepartmentsWithEmployees = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const data = await this.departmentService.getAllDepartmentsWithEmployees();
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
    );
  }

  private getAllDeparmentWithDetails = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const data = await this.departmentService.getAllDepartmentsWithDetails();
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
    );
  }
}

export default DepartmentController;
