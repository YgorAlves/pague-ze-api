import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/models/user.entity';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  
  
  async validateTokenUser(
    token: string
  ): Promise<{ isValid: boolean; userResult?: IUserResult }> {
    try {
      const { userId } = this.jwtService.verify(token);
      const user = await this.usersService.findOne(userId);
      const { password, ...userResult } = user;

      return { userResult, isValid: true };
    } catch (e) {
      return { isValid: false };
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await this.passwordsAreEqual(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async passwordsAreEqual(
    hashedPassword: string,
    plainPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

}
