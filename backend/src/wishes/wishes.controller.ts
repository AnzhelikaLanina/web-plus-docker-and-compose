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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/auth//jwt.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createWishDto: CreateWishDto, @Req() req: any) {
    return this.wishesService.createWish(req.user.id, createWishDto);
  }

  @Get('last')
  getLastWishes() {
    return this.wishesService.findLastWishes();
  }

  @Get('top')
  getTopWishes() {
    return this.wishesService.findTopWishes();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.wishesService.findWishById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateWish(
    @Body() updateWishDto: UpdateWishDto,
    @Req() req: any,
    @Param('id') id: number,
  ) {
    return this.wishesService.updateWish(req.user.id, id, updateWishDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  removeWish(@Param('id') id: number, @Req() req: any) {
    return this.wishesService.removeWish(req.user.id, id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  copyWish(@Param('id') id: number, @Req() req: any) {
    return this.wishesService.copyWish(req.user.id, id);
  }
}
