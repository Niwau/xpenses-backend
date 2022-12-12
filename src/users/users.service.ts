import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { userSchema } from './users.schema';
import { userInterface } from './users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUser(email: string) {
    return (
      await this.prismaService.user.findUnique({
        where: {
          email: email
        }
      })
    )
  } 

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return (
      await this.prismaService.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword
        }
      })
    )
  }

  async findAll() {
    return (
      await this.prismaService.user.findMany()
    )
  }

  async validateUser(user: userInterface) {
    
    const { name, email, password } = user;

    try {
      await userSchema.validate({
        name: name,
        email: email,
        password: password
      })
    } catch (err) {
      throw new UnauthorizedException(err.errors)
    }

    return user

  }

}
