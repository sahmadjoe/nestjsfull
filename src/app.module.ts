import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './task/entities/task.entity';
import { TaskModule } from './task/task.module';
import { TaskService } from './task/task.service';
import { HotelModule } from './hotel/hotel.module';
import { Hotel } from './hotel/entities/hotel.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database:'task-manajemen',
      autoLoadEntities: true,
      synchronize: true
    }),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Hotel]),
    HotelModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
