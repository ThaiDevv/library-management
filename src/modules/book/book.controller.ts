import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { searchBookDto } from './dto/search-book.dto';
import { Roles } from '../auth/roles.decorator';
import { userRole } from '../auth/entities/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
@UseGuards(AuthGuard(), RolesGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Roles(userRole.NHANVIEN)
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Patch(':id')
  @Roles(userRole.NHANVIEN)
  update(@Param('id') MaDauSach: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(MaDauSach, updateBookDto);
  }

  @Delete(':id')
  @Roles(userRole.NHANVIEN)
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
  @Get()
  @Roles(userRole.NHANVIEN)
  findOne(@Query() SearchBookDto: searchBookDto) {
    return this.bookService.findOne(SearchBookDto);
  }
}
