import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { DataSource, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task, TaskStatus } from "./entities/task.entity";

@Injectable()
export class TaskRepository extends Repository<Task>{
    constructor(private dataSource: DataSource){
      super(Task, dataSource.createEntityManager());
    }
    public async createTask(createTaskDto:CreateTaskDto,
      user : User  
    ): Promise<Task>{
    const { title, description,status } = createTaskDto;
    
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN,
    user
    await this.save(task);
    return task

    }

   public async editTask(id: string, data:UpdateTaskDto,
     
    ): Promise<Task>{
     await this.update({id},{...data})

      return this.getTaskId(id )  ////////editan baru
    }
  
    async getTaskId(id: string): Promise<Task>{
      const task = await this.findOneBy({id})

      if (! task){
        throw new NotFoundException(' task not found')
      }
      return task
    }

    async getTask(user: User){
      return this.find({where:{
        user:user
      }})
    }

    
}