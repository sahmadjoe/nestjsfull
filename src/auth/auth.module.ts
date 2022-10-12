import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
  PassportModule.register({defaultStrategy:'jwt'}),
  TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: 'topSecret51',
    signOptions: {
      expiresIn : 3600 //dlam hitungan detik
    }
  })],
  providers: [AuthService,UserRepository,JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy,PassportModule]
})
export class AuthModule {}
