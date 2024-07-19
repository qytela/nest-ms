import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern('category_findAll')
  findAll() {
    return this.categoryService.findAll();
  }
}
