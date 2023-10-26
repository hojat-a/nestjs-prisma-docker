import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, FilesModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
