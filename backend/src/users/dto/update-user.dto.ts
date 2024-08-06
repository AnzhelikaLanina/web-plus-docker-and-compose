import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @Length(2, 30)
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsOptional()
  @IsString()
  @Length(2, 200)
  about: string;
}
