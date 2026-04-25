import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { creatBorrowDto } from './dto/creatBorrow.dto';
import { updateBorrowDto } from './dto/updateDealine.dto';
import { searchDto } from './dto/searchBorrow.dto';
import { add_DelBookDto } from './dto/add_DelBook.dto';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}
  @Post()
  createBorrow(@Body() CreateBorrowDto: creatBorrowDto) {
    return this.borrowService.creatBorrow(CreateBorrowDto);
  }
  @Post('/update')
  updateBorrow(@Body() updateBorrowdto: updateBorrowDto) {
    return this.borrowService.updateDeadline(updateBorrowdto);
  }
  @Delete()
  deleteBorrow(@Query('MaPM') MaPM: string) {
    return this.borrowService.deleteBorrow(MaPM);
  }
  @Get()
  findAll(@Query() search: searchDto) {
    return this.borrowService.findAll(search);
  }
  @Post('/addBook')
  addBook(@Body() addBook: add_DelBookDto) {
    return this.borrowService.addBookinBorrow(addBook);
  }
  @Post('/deleteBook')
  deleteBook(@Body() deleteBook: add_DelBookDto) {
    return this.borrowService.deleteBookInBorrow(deleteBook);
  }
}
