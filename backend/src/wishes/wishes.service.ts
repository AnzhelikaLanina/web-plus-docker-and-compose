import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async createWish(userId: number, createWishDto: CreateWishDto) {
    return await this.wishRepository.save({
      ...createWishDto,
      owner: { id: userId },
    });
  }

  async findLastWishes() {
    return await this.wishRepository.find({
      order: {
        createdAt: 'DESC',
      },
      skip: 0,
      take: 40,
    });
  }

  async findTopWishes() {
    return await this.wishRepository.find({
      order: {
        copied: 'DESC',
      },
      skip: 0,
      take: 10,
    });
  }

  async findWishById(wishId: number) {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: { owner: true, offers: true },
    });

    if (!wish) {
      throw new BadRequestException('Подарок не найден');
    }
    return wish;
  }

  async updateWish(
    userId: number,
    wishId: number,
    updateWishDto: UpdateWishDto,
  ) {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: { owner: true },
    });

    if (!wish) {
      throw new BadRequestException('Подарок не найден');
    }

    if (wish.owner.id !== userId) {
      throw new ForbiddenException('Нельзя редактировать чужие подарки');
    }

    if (updateWishDto.price && wish.raised > 0) {
      throw new ForbiddenException('Изменить стоимость подарка уже нельзя');
    }
    await this.wishRepository.update(wishId, updateWishDto);
    return this.wishRepository.findOne({ where: { id: wishId } });
  }

  async removeWish(userId: number, wishId: number) {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: { owner: true },
    });

    if (!wish) {
      throw new BadRequestException('Подарок не найден');
    }

    if (wish.owner.id !== userId) {
      throw new ForbiddenException('Нельзя удалять чужие подарки');
    }
    await this.wishRepository.delete(wishId);
    return wish;
  }

  async copyWish(userId: number, wishId: number) {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: { owner: true },
    });

    if (!wish) {
      throw new BadRequestException('Подарок не найден');
    }

    if (wish.owner.id === userId) {
      throw new ForbiddenException('Этот подарок уже есть в вашей коллекции');
    }

    const newWish = await this.wishRepository.insert({
      ...wish,
      copied: 0,
      raised: 0,
      owner: {
        id: userId,
      },
    });

    wish.copied = +1;
    await this.wishRepository.save(wish);
    return newWish;
  }
}
