import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService){}

  async findUser(email: string){
    return (
      await this.prismaService.user.findUnique({
        where: {
          email: email
        }
      })
    )
  } 

  async createUser(name: string, email: string, password: string){
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

}
