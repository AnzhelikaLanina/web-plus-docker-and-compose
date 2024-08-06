import { IsString, IsUrl, Length, IsArray, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateWishlistDto } from './create-wishlists.dto';

export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {
  @IsOptional()
  @IsString()
  @Length(1, 250)
  name: string;

  @IsOptional()
  @IsString()
  @Length(1, 1500)
  description: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  @IsArray()
  itemsId: number[];
}
