/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsPhoneNumber, IsString } from 'class-validator';

export class UserSignupDTO {
  @IsString()
  userName: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirmation: string;

  @IsPhoneNumber()
  phoneNumber: string;
}
