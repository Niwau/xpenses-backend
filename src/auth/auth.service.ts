import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/users.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UsersService){}

  async register(user: UserDto) {

    const { name, email, password } = user;

    const userExists = await this.usersService.getUserByEmail(email);

    if (userExists) {
      throw new UnauthorizedException('User already exists')
    }

    return this.usersService.createUser(name, email, password);
  }

  async login(user: UserDto) {

    const { email, password } = user;

    if(!email || !password) {
      throw new BadRequestException('Invalid credentials')
    }

    const userExists = await this.usersService.getUserByEmail(email)

    if (!userExists) {
      throw new UnauthorizedException('User does not exists')
    } 

    const passwordMatches = await bcrypt.compare(user.password, userExists.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Wrong email/password')
    }

    const token = jwt.sign(
      {
        id: userExists.id,
        name: userExists.name,
      },
      process.env.SECRET, 
      { 
        expiresIn: "1d" 
      }
    )

    return (
      { message: 'Sucess', token: token }
    )
  }

}
