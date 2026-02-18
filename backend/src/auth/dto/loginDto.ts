import { IsEmail, IsString } from 'class-validator';

export class loginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  passwordAttempt: string;
}
