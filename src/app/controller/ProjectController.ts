import APP_CONSTANTS from "../constants";
import { AbstractController } from "../util/rest/controller";
import { ProjectsService} from "../services/ProjectsService";
import { request } from "http";
import RequestWithUser from "../util/rest/request";
import { NextFunction, Router, Response } from "express";

class ProjectsController extends AbstractController {

    constructor(
      private projectsService: ProjectsService
    ) {
      super(`${APP_CONSTANTS.apiPrefix}/projects`);
      this.initializeRoutes();
    }

    protected initializeRoutes = (): void => {
        this.router.post(
            `${this.path}`,
            this.createProject
        );
    }

    private createProject = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
     ) => {
         const data = await this.projectsService.createProject(request.body);
         response.send(
             this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
         );
     }

}

export default ProjectsController;