import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
