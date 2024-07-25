import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientKafkaOpts } from 'shared/utils/client-kafka-opts';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOG_SERVICE',
        transport: Transport.KAFKA,
        options: new ClientKafkaOpts({ clientId: 'log', groupId: 'log-consumer' }).getOptions(),
      },
    ]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
