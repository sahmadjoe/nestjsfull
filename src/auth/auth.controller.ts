import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.creat.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('/signup')
    signUp(@Body() authCredentialsDto:AuthCredentialsDto): Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto:AuthCredentialsDto): Promise<{}>{
        // return this.authService.sigIn(authCredentialsDto);
        return this.authService.sigIn(authCredentialsDto)
    }

    @Post()
    @UseGuards(AuthGuard())
    test(@Req() req){
        
    }

}
