import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DatabaseService) {}
  async findUserByName(userName: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        userName,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(userInfo: CreateUserDto): Promise<void> {
    await this.prisma.user.create({
      data: userInfo,
    });
  }
}
