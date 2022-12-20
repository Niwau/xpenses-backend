import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UsersValidationPipe } from 'src/users/users-validation.pipe';
import { UserDto } from 'src/users/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService ) {}

  @Post('register')
  @UsePipes(new UsersValidationPipe())
  register(@Body() user: UserDto) {
    return this.authService.register(user)
  }

  @Post('login')
  login(@Body() user: UserDto) {
    return this.authService.login(user)
  }
  
}
