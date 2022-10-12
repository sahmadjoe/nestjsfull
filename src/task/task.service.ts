import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { TaskRepository } from './task-repository';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ){}

 public async createTask(createTaskDto: CreateTaskDto,
    user : User
  ) : Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto,user);
  }

 public async getTask(
    user : User
 ): Promise<Task[]>{
    return await this.taskRepository.getTask(user);
  }

  

  public async getTaskId(id: string): Promise<Task>{
    const found = await this.taskRepository.findOne({where:{id}});

    if (! found) {
      throw new NotFoundException ('Task Tidak ada');
    }
    return found;
  }

  public async editTask(id: string, createTaskDto:CreateTaskDto,
    // user : User 
  ): Promise<Object>{
    const edit = await this.taskRepository.editTask(id,createTaskDto);
    
    return edit
  
  }
  public async deletTask(id: string): Promise<void>{
    await this.taskRepository.delete(id)
  }
  
 }

