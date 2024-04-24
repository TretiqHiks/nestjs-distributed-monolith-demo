import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModules } from './app.modules';
import { ClientsModule } from '@nestjs/microservices';
import { RabbitMQModule } from '../infrastructure/rabbitmq/rabbitmq.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...AppModules,
  ],
})
export class AppModule {}
