import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async createOffer(createOfferDto: CreateOfferDto, userId: number) {
    const wish = await this.wishRepository.findOne({
      where: { id: createOfferDto.itemId },
      relations: ['owner'],
    });

    if (!wish) {
      throw new BadRequestException('Подарок не найден');
    }

    if (wish.owner.id === userId) {
      throw new ForbiddenException('Вы не можете скинуться на свой подарок');
    }

    if (wish.price - wish.raised < createOfferDto.amount) {
      throw new ForbiddenException('Вносимая сумма превышает стоимость подарка');
    }
    wish.raised = +wish.raised + createOfferDto.amount;
    await this.wishRepository.save(wish);

    return await this.offerRepository.save({
      ...createOfferDto,
      user: { id: userId },
      item: { id: createOfferDto.itemId },
    });
  }

  async findOffers() {
    return await this.offerRepository.find({
      relations: {
        item: true,
        user: true,
      },
    });
  }

  async findOfferById(offerId: number) {
    return await this.offerRepository.findOne({
      where: { id: offerId },
      relations: ['user', 'item'],
    });
  }
}
