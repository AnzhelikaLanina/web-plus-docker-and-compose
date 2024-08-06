import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('me')
  getCurrentUser(@Req() req: any) {
    return this.usersService.findById(req.user.id);
  }

  @Get(':username')
  getUserByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Patch('me')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req: any) {
    return this.usersService.update(updateUserDto, req.user.id);
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get('me/wishes')
  getCurrentWishes(@Req() req: any) {
    return this.usersService.getMyWishes(req.user.id);
  }

  @Get(':username/wishes')
  getUserWishes(@Param('username') username: string) {
    return this.usersService.getUserWishes(username);
  }

  @Post('find')
  findMany(@Body('query') query: string) {
    return this.usersService.findMany(query);
  }
}
