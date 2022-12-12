import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UsersService){}

  async register(user: UserDto) {

    await this.usersService.validateUser(user)

    const { name, email, password } = user;

    const userExists = await this.usersService.findUser(user.email);

    if (userExists) {
      throw new UnauthorizedException('User already exists')
    }

    return this.usersService.createUser(name, email, password);
  }

  async login(user: UserDto) {
    const userExists = await this.usersService.findUser(user.email)

    if (!userExists) {
      throw new UnauthorizedException('User does not exists')
    } 

    const passwordMatches = await bcrypt.compare(user.password, userExists.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Wrong email/password')
    }



  }

}
