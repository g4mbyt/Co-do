import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { signupDto } from './dto/signupDto';
import { loginDto } from './dto/loginDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginInfo: loginDto) {
    return this.authService.authenticate(loginInfo);
  }

  @Post('signup')
  signup(@Body() userInfo: signupDto) {
    return this.authService.signUpUser(userInfo);
  }
}
