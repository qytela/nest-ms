import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientKafkaOpts } from 'shared/utils/client-kafka-opts';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PromModule } from '../prom/prom.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: new ClientKafkaOpts({ clientId: 'auth', groupId: 'auth-consumer' }).getOptions(),
      },
    ]),
    PromModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
