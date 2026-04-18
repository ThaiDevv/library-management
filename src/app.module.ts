import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { CategoryModule } from './modules/category/category.module';
import { BookModule } from './modules/book/book.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Cho phép đọc .env ở toàn dự án
    }),
    DatabaseModule,
    CategoryModule,
    BookModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
