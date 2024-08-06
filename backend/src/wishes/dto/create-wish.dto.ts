import { IsOptional, IsString, IsUrl, Length, Min } from 'class-validator';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @Min(1)
  price: number;

  @IsOptional()
  @IsString()
  @Length(1, 1024)
  description: string;
}
