import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const existUser = await this.userService.checkUser(username);
    if (existUser) {
      throw new HttpException('username already exists', HttpStatus.CONFLICT);
    }
    return await this.userService.register(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
