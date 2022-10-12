import { IsEnum, IsNotEmpty, Length } from "class-validator";
import { TaskStatus } from "../entities/task.entity";

export class CreateTaskDto {

    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    @Length(20,100)
    description : string;

    @IsEnum(TaskStatus)
    status : TaskStatus
}
