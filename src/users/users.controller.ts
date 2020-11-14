import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private userService: UsersService
  ) { }

  @Post('register')
  async register(@Body() any: any) {
    return await this.userService.register(any);
  }

}
