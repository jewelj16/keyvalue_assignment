import { Response, NextFunction } from "express";
import APP_CONSTANTS from "../constants";
import { RoleService } from "../services/RoleService";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";

class RoleController extends AbstractController{
    constructor(private roleService: RoleService){
        super(`${APP_CONSTANTS.apiPrefix}/role`);
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
      this.router.get(
        `${this.path}`,
        this.asyncRouteHandler(this.getAllRoles)
      );
      this.router.get(
        `${this.path}/emp`,
        this.asyncRouteHandler(this.getEmployeeByRole)
      );

       this.router.post(`${this.path}`,this.createRole) ,
       this.router.put(`${this.path}/:roleId`,this.updateRole) ,
       this.router.delete(
        `${this.path}/:roleId`,
        this.asyncRouteHandler(this.deleteRole)
      );

       

    }
    private getAllRoles = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
        const data = await this.roleService.getAllRoles();
        response.send(
          this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
        );
      }
    
    private createRole = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        const data = await this.roleService.createRole(request.body);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
    }

    private updateRole = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
          const data = await this.roleService.updateRole(request.params.roleId, request.body);
          response.status(201).send(
            this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
          );
      }

      private deleteRole = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
          const data = await this.roleService.deleteRole(request.params.roleId);
          response.status(201).send(
            this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
          );

      }

      private getEmployeeByRole = async(
        request: RequestWithUser,
        response: Response,
        next: NextFunction 
      ) => {

        const data = await this.roleService.getEmployees(request.params.roleId);
        response.status(201).send(
          this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
        )
      }
    

}

export default RoleController;