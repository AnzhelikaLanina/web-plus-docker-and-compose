import { IsBoolean, IsNumber } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  itemId: number;

  @IsNumber()
  amount: number;

  @IsBoolean()
  hidden: boolean;
}
