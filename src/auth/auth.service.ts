import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService){}

  async validateUser(email: string, password: string) {
    const user = this.usersService.findUser(email)

    if (!user) {
      throw new UnauthorizedException('The user does not exists')
    }

    const passwordMatches = await bcrypt.compare(password, (await user).password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user;

  }

}
