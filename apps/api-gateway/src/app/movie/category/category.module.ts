import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { uuid } from 'uuidv4';
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
            brokers: () => (process.env.KAFKA_BROKERS as string).split(','),
          },
          consumer: {
            groupId: 'movie-consumer-' + uuid(),
          },
        },
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
