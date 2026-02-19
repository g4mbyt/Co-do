import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { loginDto } from './dto/loginDto';
import { signupDto } from './dto/signupDto';
import { authResponseDto } from './dto/authResponseDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(userInput: loginDto): Promise<authResponseDto> {
    const user = await this.usersService.findUserByEmail(userInput.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordsMatch = await argon2.verify(
      user.passwordHash,
      userInput.passwordAttempt,
    );

    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.jwtTokenGen(user.id, user.email);
  }

  async signUpUser(userInput: signupDto): Promise<authResponseDto> {
    if (userInput.password !== userInput.passwordConfirmation)
      throw new BadRequestException('Passwords do not match');

    try {
      const hashedPassword = await argon2.hash(userInput.password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, passwordConfirmation, ...userWithNoPassword } =
        userInput;

      const userCreationResponse = await this.usersService.createUser({
        ...userWithNoPassword,
        passwordHash: hashedPassword,
      });

      return this.jwtTokenGen(
        userCreationResponse.id,
        userCreationResponse.email,
      );
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2002') {
        throw new BadRequestException('Email or username already taken.');
      }
      throw new BadRequestException(
        'Something unexpected happened, please try again.',
      );
    }
  }

  async jwtTokenGen(id: string, email: string): Promise<authResponseDto> {
    const tokenPayload = {
      sub: id,
      email: email,
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      id,
      email,
      accessToken,
    };
  }
}
