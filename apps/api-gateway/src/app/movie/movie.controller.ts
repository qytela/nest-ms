import { Controller, Get, Req } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(@Req() req) {
    return this.movieService.findAll(req);
  }
}
