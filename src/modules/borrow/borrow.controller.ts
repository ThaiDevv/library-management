import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { creatBorrowDto } from './dto/creatBorrow.dto';
import { updateBorrowDto } from './dto/updateDealine.dto';
import { searchDto } from './dto/searchBorrow.dto';
import { add_DelBookDto } from './dto/add_DelBook.dto';
import { Roles } from '../auth/roles.decorator';
import { userRole } from '../auth/entities/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
@UseGuards(AuthGuard(), RolesGuard)
@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}
  @Post()
  @Roles(userRole.NHANVIEN)
  createBorrow(@Body() CreateBorrowDto: creatBorrowDto) {
    return this.borrowService.creatBorrow(CreateBorrowDto);
  }
  @Post('/update')
  @Roles(userRole.NHANVIEN)
  updateBorrow(@Body() updateBorrowdto: updateBorrowDto) {
    return this.borrowService.updateDeadline(updateBorrowdto);
  }
  @Delete()
  @Roles(userRole.NHANVIEN)
  deleteBorrow(@Query('MaPM') MaPM: string) {
    return this.borrowService.deleteBorrow(MaPM);
  }
  @Get()
  @Roles(userRole.NHANVIEN)
  findAll(@Query() search: searchDto) {
    return this.borrowService.findAll(search);
  }
  @Post('/addBook')
  @Roles(userRole.NHANVIEN)
  addBook(@Body() addBook: add_DelBookDto) {
    return this.borrowService.addBookinBorrow(addBook);
  }
  @Post('/deleteBook')
  @Roles(userRole.NHANVIEN)
  deleteBook(@Body() deleteBook: add_DelBookDto) {
    return this.borrowService.deleteBookInBorrow(deleteBook);
  }
}
