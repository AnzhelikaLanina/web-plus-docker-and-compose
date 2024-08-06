import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { JwtGuard } from 'src/auth/jwt.guard';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlists.dto';
import { UpdateWishlistDto } from './dto/update-wishlists.dto';

@Controller('wishlistlists')
@UseGuards(JwtGuard)
export class WishlistController {
  constructor(private readonly wishlistsService: WishlistService) {}

  @Post()
  create(@Req() req: any, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.createWishlist(req.user.id, createWishlistDto);
  }

  @Get()
  getAllWishlists() {
    return this.wishlistsService.findWishLists();
  }

  @Get(':id')
  getOneWishlist(@Param('id') id: number) {
    return this.wishlistsService.findWishlistById(id);
  }

  @Patch(':id')
  updateWishlist(
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Req() req: any,
  ) {
    return this.wishlistsService.updateWishlist(
      req.user.id,
      id,
      updateWishlistDto,
    );
  }

  @Delete(':id')
  removeWishlist(@Param('id') id: number, @Req() req: any) {
    return this.wishlistsService.removeWishlist(req.user.id, id);
  }
}
