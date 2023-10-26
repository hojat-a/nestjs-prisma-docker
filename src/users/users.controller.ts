import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Payload } from 'src/auth/decorators';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  getData(@Payload() payload) {
    return this.usersService.get(payload);
  }
}
