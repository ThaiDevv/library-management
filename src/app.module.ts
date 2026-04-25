import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { CategoryModule } from './modules/category/category.module';
import { BookModule } from './modules/book/book.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ReportModule } from './modules/report/report.module';
import { BorrowModule } from './modules/borrow/borrow.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CategoryModule,
    BookModule,
    AuthModule,
    UserModule,
    ReportModule,
    BorrowModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
