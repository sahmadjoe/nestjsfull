import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth.creat.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialDto:AuthCredentialsDto) : Promise<void> {

        const {username, password} = authCredentialDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({username, password: hashedPassword});

        try{
            await this.save(user);

        } catch(error){
            if ( error.errno == '1062'){
                throw new ConflictException('username already axists');
            } else{
                throw new InternalServerErrorException();
            }
        }
        
    }
   
        
    
}