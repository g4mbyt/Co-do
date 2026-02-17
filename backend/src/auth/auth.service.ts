import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { UserSignupDTO } from './dto/userSignupDTO';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(userInfo: CreateUserDto): Promise<User> {
    const user = await this.usersService.findUserByName(userInfo.userName);
    return user;
  }

  async signUpUser(userInfo: UserSignupDTO): Promise<void> {
    if (userInfo.password !== userInfo.passwordConfirmation)
      throw new BadRequestException('Passwords do not match');

    const hashedPassword = await argon2.hash(userInfo.password);
    const userWithHashedPassword = {
      userName: userInfo.userName,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      passwordHash: hashedPassword,
    };

    try {
      await this.usersService.createUser(userWithHashedPassword);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      switch (error.code) {
        case 'P2002':
          throw new ConflictException(
            'An account with this username or email already exists',
          );
        default:
      }
    }
  }
}
