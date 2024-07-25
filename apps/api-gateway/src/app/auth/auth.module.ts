import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientKafkaOpts } from 'shared/utils/client-kafka-opts';
import { MakeMetricsProvider } from 'shared/utils/prom-client/MakeMetricsProvider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PromService } from '../prom.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: new ClientKafkaOpts({ clientId: 'auth', groupId: 'auth-consumer' }).getOptions(),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, PromService, ...MakeMetricsProvider()],
})
export class AuthModule {}
