import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @MessagePattern('movie.findAll')
  findAll() {
    return this.movieService.findAll();
  }
}
