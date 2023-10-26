import * as bcrypt from 'bcrypt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { hashingConstants } from './constants';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async signUp(user: AuthDto) {
    try {
      const saltOrRounds = hashingConstants.saltOrRounds;
      const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
      await this.databaseService.user.create({
        data: {
          email: user.email,
          hash: hashedPassword,
        },
      });
      return {
        status: HttpStatus.CREATED,
        message: 'User account created successfully.',
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'User account already exists',
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signIn(user: AuthDto) {
    try {
      const userData = await this.databaseService.user.findUnique({
        where: {
          email: user.email,
        },
      });
      const isMatch = await bcrypt.compare(user?.password, userData.hash);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const payload = { username: userData.email, sub: userData.id };
      return {
        status: HttpStatus.OK,
        message: 'Sign-in successful. Welcome back!',
        data: {
          access_token: this.jwtService.sign(payload),
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
