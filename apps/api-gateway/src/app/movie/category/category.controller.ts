import { Controller, Get, Req } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('movie/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(@Req() req) {
    return this.categoryService.findAll(req);
  }
}
