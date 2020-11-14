import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule.register({
    defaultStrategy: 'jwt',
    property: 'user',
    session: false
  }), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '12d' }
  })],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {  }
