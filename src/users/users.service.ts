import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, role = Role.USER, ...data } = createUserDto;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
          role,
        },
      });
      return user;
    } catch (error) {
      console.log(error);

      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return;
      if (error.code === 'P2002') throw new ConflictException();
      return 'error';
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
