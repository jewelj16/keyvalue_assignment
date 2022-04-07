import { plainToClass } from "class-transformer";
import { Projects } from "../entities/Projects";
import { ProjectsRepository } from "../repository/ProjectsRepository";

export class ProjectsService{
    constructor(
        private projectsRepository: ProjectsRepository
    ){}

    public async createProject(projectInput: any)
    {
        const projectData = plainToClass(Projects, {
            "name": projectInput.name,
            //description : "KeyValue"
        });
        const savedDetails = await this.projectsRepository.createProject(projectData);
        return savedDetails;
    }
}