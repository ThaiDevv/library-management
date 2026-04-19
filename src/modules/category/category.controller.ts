import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { userRole } from '../auth/entities/user-role.enum';
@UseGuards(AuthGuard(), RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  @Roles(userRole.NHANVIEN)
  addCategory(@Body() creatCategory: CreateCategoryDto) {
    return this.categoryService.addCategoryService(creatCategory);
  }
  @Patch(':id')
  @Roles(userRole.NHANVIEN)
  updateCategory(
    @Param('id') MaTheLoai: string,
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(MaTheLoai, updateCategory);
  }
  @Delete(':id')
  @Roles(userRole.NHANVIEN)
  deleteCategory(@Param('id') MaTheLoai: string) {
    return this.categoryService.deleteCategory(MaTheLoai);
  }
  @Get()
  @Roles(userRole.NHANVIEN)
  getAllcategory() {
    return this.categoryService.getAllcategory();
  }
}
