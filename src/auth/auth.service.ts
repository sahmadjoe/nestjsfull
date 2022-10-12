import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth.creat.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        private jwtService : JwtService
    ){}

    //sign up
    async signUp(authCredentialDto:AuthCredentialsDto): Promise<void>{
        return this.userRepository.createUser(authCredentialDto)
    }

    //Login sebelum pakai token

//     async sigIn (authCredentialDto:AuthCredentialsDto): Promise<string>{

//         const {username,password} = authCredentialDto;
//         const user = await  this.userRepository.findOne({
//             where: {
//                 username : username
//             }
//         });

//         if(user && (await bcrypt.compare(password,user.password))){
//             return "Sukses Logiin"
//         }
//     }
// }


async sigIn (authCredentialDto:AuthCredentialsDto): Promise<{accesToken:string}>{

    const {username,password} = authCredentialDto;
    const user = await  this.userRepository.findOne({
        where: {
            username : username
        }
    });

    if(user && (await bcrypt.compare(password,user.password))){
        const payload : JwtPayload = {username};
        const accesToken : string = await this.jwtService.sign(payload)
        return {accesToken}
    }
}
}

