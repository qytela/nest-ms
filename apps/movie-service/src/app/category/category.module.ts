import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
      {
        name: 'LOG_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'log',
            brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094'],
          },
          consumer: {
            groupId: 'log-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
