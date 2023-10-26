import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async get(userPayload) {
    try {
      const userData = this.databaseService.user.findUnique({
        where: {
          id: userPayload.userId,
        },
        select: {
          firstName: true,
          lastName: true,
        },
      });
      return userData;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
