import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientKafkaOpts } from 'shared/utils/client-kafka-opts';
import { MakeMetricsProvider } from 'shared/utils/prom-client/MakeMetricsProvider';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { PromService } from '../prom.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MOVIE_SERVICE',
        transport: Transport.KAFKA,
        options: new ClientKafkaOpts({ clientId: 'movie', groupId: 'movie-consumer' }).getOptions(),
      },
    ]),
  ],
  controllers: [MovieController],
  providers: [MovieService, PromService, ...MakeMetricsProvider()],
})
export class MovieModule {}
