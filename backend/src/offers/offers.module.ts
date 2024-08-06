import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Wish } from '../wishes/entities/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Wish])],
  providers: [OffersService],
  controllers: [OffersController],
})
export class OffersModule {}
