import { Exclude } from "class-transformer";
import { type } from "os";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  // save() {
  //   throw new Error("Method not implemented.");
  // }
    @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     title: string;

     @Column()
     description: string;

     @Column()
     status: TaskStatus;

     @ManyToOne((_type) => User,(user) => user.task, {eager: false} )
     @Exclude({toPlainOnly: true})
     user : User

}


///////UNTUK ENUM======
export enum TaskStatus{
    OPEN = 'open',
    IN_PROGRES = 'inprogres',
    DONE = 'done'

}


