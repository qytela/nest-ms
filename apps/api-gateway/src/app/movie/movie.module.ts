import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientKafkaOpts } from 'shared/utils/client-kafka-opts';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { PromModule } from '../prom/prom.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MOVIE_SERVICE',
        transport: Transport.KAFKA,
        options: new ClientKafkaOpts({ clientId: 'movie', groupId: 'movie-consumer' }).getOptions(),
      },
    ]),
    PromModule,
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
