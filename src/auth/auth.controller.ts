import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/users/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService ) {}

  @Post('register')
  register(@Body() user: UserDto) {
    return this.authService.register(user)
  }

  @Post('login')
  login(@Body() user: UserDto) {
    return this.authService.login(user)
  }
  
}
