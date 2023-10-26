import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Public } from './decorators';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signIn')
  async signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @Public()
  @Post('signUp')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }
}
