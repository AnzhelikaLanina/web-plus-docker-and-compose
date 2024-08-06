import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './entities/wishlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}
