import { IsEmail, IsString, IsNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @MinLength(5)
  userName: string;

  @IsEmail()
  email: string;

  @IsNumber()
  phoneNumber: string;

  @IsString()
  passwordHash: string;
}
