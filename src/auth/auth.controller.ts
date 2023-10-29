import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUserLoginRequest, IUserResponse, IUserRegisterRequest } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() user: IUserRegisterRequest,
  ): Promise<IUserResponse | null> {
    console.log(user);
    return await this.authService.signup(user);
  }

  @Post('signin')
  async signin(@Body() user: IUserLoginRequest): Promise<IUserResponse> {
    return await this.authService.signIn(user);
  }
}
