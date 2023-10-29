import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUserLoginRequest, IUserRegisterRequest } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() user: IUserRegisterRequest) {
    return this.authService.signup(user);
  }

  @Post('signin')
  async signin(@Body() user: IUserLoginRequest) {
    return this.authService.signIn(user);
  }
}
