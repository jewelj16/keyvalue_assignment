import { IsInt, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    public role: string;

    @IsString()
    public description: string;

    @IsInt()
    public salary: number;
}