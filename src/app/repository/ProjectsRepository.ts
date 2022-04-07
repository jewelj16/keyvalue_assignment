import { getConnection, Repository } from "typeorm";
import { Projects } from "../entities/Projects";

export class ProjectsRepository extends Repository<Projects> {
    public async createProject(projectDetails: Projects){
        const projectsConnection =await  getConnection().getRepository(Projects);
        console.log("savedDetails")

        const savedDetails = await projectsConnection.save(projectDetails);
        console.log(savedDetails)
        return savedDetails;
    }
}