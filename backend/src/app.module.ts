import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { WishlistModule } from './wishlists/wishlist.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { Offer } from './offers/entities/offer.entity';
import { Wish } from './wishes/entities/wish.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';
import { AuthModule } from './auth/auth.module';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_SYNCHRONIZE,
} = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../../.env', isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT),
      username: POSTGRES_USER,
      password: String(POSTGRES_PASSWORD),
      database: POSTGRES_DB,
      entities: [Offer, User, Wish, Wishlist],
      synchronize: Boolean(POSTGRES_SYNCHRONIZE),
    }),
    WinstonModule.forRoot({
      levels: {
        critical_error: 0,
        error: 1,
        special_warning: 2,
        another_log_level: 3,
        info: 4,
      },
      transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
    }),
    UsersModule,
    WishesModule,
    WishlistModule,
    OffersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
