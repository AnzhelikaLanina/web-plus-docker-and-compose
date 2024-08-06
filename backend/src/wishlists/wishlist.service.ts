import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlists.dto';
import { UpdateWishlistDto } from './dto/update-wishlists.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async createWishlist(userId: number, createWishlistDto: CreateWishlistDto) {
    const wishItems = createWishlistDto.itemsId.map((id) => ({ id }));
    return await this.wishlistRepository.save({
      ...createWishlistDto,
      owner: { id: userId },
      items: wishItems,
    });
  }

  async findWishLists() {
    return await this.wishlistRepository.find({
      relations: ['items', 'owner'],
    });
  }

  async findWishlistById(wishlistId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: wishlistId },
      relations: ['items', 'owner'],
    });

    if (!wishlist) {
      throw new BadRequestException('Подборка подарков не найдена');
    }
    return wishlist;
  }

  async updateWishlist(
    userId: number,
    wishlistId: number,
    updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: wishlistId },
      relations: { owner: true },
    });

    if (!wishlist) {
      throw new BadRequestException('Подборка подарков не найдена');
    }

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException('Нельзя редактировать чужие подборки подарков');
    }

    const { itemsId, ...rest } = updateWishlistDto;
    if (itemsId) {
      const newWishItems = itemsId.map((id) => ({ id }));
      const updateWishList = { itemsId: newWishItems, ...rest };
      await this.wishlistRepository.save({
        ...updateWishList,
        id: wishlistId,
        owner: { id: userId },
      });
    } else {
      await this.wishlistRepository.save({
        ...updateWishlistDto,
        id: wishlistId,
        owner: { id: userId },
      });
    }
    return await this.wishlistRepository.findOneBy({ id: wishlistId });
  }

  async removeWishlist(userId: number, wishlistId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: wishlistId },
      relations: { owner: true },
    });

    if (!wishlist) {
      throw new BadRequestException('Подборка подарков не найдена');
    }

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException('Нельзя удалять чужие подборки подарков');
    }
    await this.wishlistRepository.delete(wishlistId);
    return wishlist;
  }
}
