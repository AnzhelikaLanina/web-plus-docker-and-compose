import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalGuard } from './local.guard';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Req() req: any) {
    return this.authService.signin(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
