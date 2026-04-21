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
  findAll() {
    return this.borrowService.findAll();
  }
}
