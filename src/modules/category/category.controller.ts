import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  addCategory(@Body() creatCategory: CreateCategoryDto) {
    return this.categoryService.addCategoryService(creatCategory);
  }
  @Patch(':id')
  updateCategory(
    @Param('id') MaTheLoai: string,
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(MaTheLoai, updateCategory);
  }
  @Delete(':id')
  deleteCategory(@Param('id') MaTheLoai: string) {
    return this.categoryService.deleteCategory(MaTheLoai);
  }
  @Get()
  getAllcategory() {
    return this.categoryService.getAllcategory();
  }
}
