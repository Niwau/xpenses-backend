import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(userId: number) {
    return (
      await this.prismaService.user.findUnique({
        where: {
          id: userId
        },
        include: {
          transactions: true
        }
      })
    )
  }

  async getUserByEmail(email: string) {
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
      await this.prismaService.user.findMany({
        include: {
          transactions: true
        }
      })
    )
  }

}
