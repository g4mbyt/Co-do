import {
  Body,
  Controller,
  NotImplementedException,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserSignupDTO } from './dto/userSignupDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login() {
    throw new NotImplementedException();
  }

  @Post('signup')
  signup(@Body() userInfo: UserSignupDTO) {
    return this.authService.signUpUser(userInfo);
  }
}
