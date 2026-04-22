import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAccountNVDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateDocGiaDto } from './dto/create-DocGia.dto';
import { CreateFindDocGiaDto } from './dto/create-FindDocGia.dto';
import { ViewDocGiaDto } from './dto/create-ViewDocGia.dto';
import { CreateNewNhanVienDto } from './dto/create-NhanVien.Dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateAccountNVDto) {
    return this.userService.createAccountNV(createUserDto);
  }
  @Post('/docgia')
  CreateDocGia(@Body() createDocGiaDto: CreateDocGiaDto){
    return this.userService.CreateDocGia(createDocGiaDto)
  }
  @Patch('docgia/:id')
  UpdateDocGia(@Param('id') id:string,@Body() createUpdateDocGiaDto: CreateDocGiaDto){
    createUpdateDocGiaDto.MaDocGia=id;
    return this.userService.UpdateDocGia(createUpdateDocGiaDto)
  }
  @Delete('docgia/:id')
  DeleteDocGia(@Param('id') id:string ){
    return this.userService.DeleteDocGia(id);
  }
  @Get('find')
  FindDocGia(@Query() findDocGia:CreateFindDocGiaDto){
    return this.userService.FindDocGia(findDocGia)
  }
  @Get('view')
  ViewDocGia(@Query() viewdocgia:ViewDocGiaDto){
    return this.userService.ViewDocGia(viewdocgia)
  }
  @Post('/nhanvien')
  CreateNewNhanVien(@Body() createNewNhanVienDto:CreateNewNhanVienDto){
    return this.userService.CreateNewNhanVien(createNewNhanVienDto)
  }
  @Patch("nhanvien/:MaNV")
  UpdateNhanVien(@Param('MaNV') MaNV:string,@Body() updateNhanVienDto:CreateNewNhanVienDto){
    updateNhanVienDto.MaNV=MaNV;
    return this.userService.UpdateNhanVien(updateNhanVienDto)
  }
  @Delete("nhanvien/:MaNV")
  DeleteNhanVien(@Param('MaNV') MaNV:string){
    return this.userService.DeleteNhanVien(MaNV);
  }
  @Get('viewNhanVien')
  ViewNhanVien(@Query() viewNhanVien:CreateNewNhanVienDto){
    return this.userService.ViewNhanVien(viewNhanVien);
  }
}
