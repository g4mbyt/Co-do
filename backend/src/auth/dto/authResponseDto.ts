import { IsString } from 'class-validator';

export class authResponseDto {
  @IsString()
  id: string;

  @IsString()
  email: string;

  @IsString()
  accessToken: string;
}
