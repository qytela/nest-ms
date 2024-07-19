import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MOVIE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'movie',
            brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094'],
          },
          consumer: {
            groupId: 'movie-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
