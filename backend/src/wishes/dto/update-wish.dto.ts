import { IsOptional, IsString, IsUrl, Length, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateWishDto } from './create-wish.dto';

export class UpdateWishDto extends PartialType(CreateWishDto) {
  @IsOptional()
  @IsString()
  @Length(1, 250)
  name: string;

  @IsOptional()
  @IsUrl()
  link: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  @Min(1)
  price: number;

  @IsOptional()
  @IsString()
  @Length(1, 1024)
  description: string;
}
