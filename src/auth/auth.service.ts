import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtServices: JwtService,
  ) {}

  async logIn(loginDto: LoginDto) {
    const user = await this.usersService.findOne(loginDto.email);
    if (!user) {
      return {
        message: 'User not found',
      };
    }

    const ispasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!ispasswordValid) {
      return {
        message: 'Invalid password',
      };
    }

    const token = await this.jwtServices.signAsync({
      role: user.role,
      email: user.email,
    });
    return { token, role: user.role, name: user.name };
  }
}
