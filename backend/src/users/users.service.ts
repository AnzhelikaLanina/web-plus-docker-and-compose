import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userInfo: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: [
        { username: userInfo.username },
        { email: userInfo.email },
      ],
    });
    if (user) {
      throw new ConflictException(
        'Пользователь с таким email или username уже зарегистрирован'
      );
    }

    const hash = await bcrypt.hash(userInfo.password, 10);
    const { id, username, about, avatar, email, createdAt, updatedAt } =
      await this.userRepository.save({ ...userInfo, password: hash });
    return { id, username, about, avatar, email, createdAt, updatedAt };
  }

  async update(userInfo: UpdateUserDto, id: number) {
    if (userInfo.password) {
      userInfo.password = await bcrypt.hash(userInfo.password, 10);
    }

    if (userInfo.email || userInfo.username) {
      const user = await this.userRepository.findOne({
        where: [
          { username: userInfo.username },
          { email: userInfo.email },
        ],
      });
      if (user) {
        throw new ConflictException(
          'Пользователь с такими данными уже существует'
        );
      }
    }

    await this.userRepository.update(id, userInfo);
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('Пользователя c таким именем не существует');
  }

  async findById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findMany(query: string) {
    return await this.userRepository.find({
      where: [{ email: query }, { username: query }],
    });
  }

  async getMyWishes(userId: number) {
    const wishes = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['wishes'],
    });
    return wishes.wishes;
  }

  async getUserWishes(username: string) {
    const user = await this.findByUsername(username);
    const wishes = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['wishes'],
    });
    return wishes.wishes;
  }
}
