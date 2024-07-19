import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('movie/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  findAll() {
    return this.categoryService.findAll();
  }
}
