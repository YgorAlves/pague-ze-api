import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/models/user.entity';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { RegisterUserResponseDto } from './dto/RegisterUserResponse.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(
    private userService: UsersService
  ) { }

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto): Promise<RegisterUserResponseDto> {
    return await this.userService.register(registerUser);
  }

  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    // console.log(user)
    return await this.userService.getProfile(user);
  }
  
}
