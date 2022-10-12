import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto,
    @GetUser()user : User,// Aagar yang imput task dengan id user
  ) : Promise<Task> {
    const task = await this.taskService.createTask(createTaskDto,user)

    return task
  }

  // asycn creataTask(function) --> body(data yang akan diambil, bisa -
  //dari inputan) createTaskDto = variable yang akan -
  // mewakili class CreateTaskDto, CreateTaskDto sendiri adalah class -
  //pada file createDto, Promise--> menunggu 
  //proses selesai proses function, Task merupakan entity/tabel
  // const task = mendefinisikan variabel task
  // await menunggu
  // this taskService = mengambil variabel dari constractor/dari luar function -
  // createTask--> mengambil satu function dari task service
  //


  @Get()
  findAll(
    @GetUser()user : User
  ) {
    return this.taskService.getTask(user);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.taskService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createTask: CreateTaskDto) {
    return this.taskService.editTask(id, createTask);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.deletTask(id);
  }



  // @Get('/:id')
  // getTaskById(@Param('id') id: string) : Promise<Task>{
  //   return this.taskService.getTaskById(id)
  // }

  // @Get()
  // async getTasks(): Promise<Task[]>{
  //   const tasks = await this.taskService.getTask();
  //   return tasks
  // }

  @Get('/:id')
  async getTaskId(@Param('id') id : string){
    const task = await this.taskService.getTaskId(id)
    return task
  }

  // @Patch()
  // async editTask(@Body() createTaskDto:CreateTaskDto,@Param('id')id: string): Promise<Task>{
  //   const edit = await this.taskService.editTask(id,createTaskDto);
  //   return edit
  // }


}
