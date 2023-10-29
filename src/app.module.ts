import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MoviesModule } from './movies/movies.module';
import { MoviesServiceService } from './movies.service/movies.service.service';

@Module({
  imports: [AuthModule, UserModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService, MoviesServiceService],
})
export class AppModule {}
