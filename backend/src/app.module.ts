import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { EventModule } from './event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './messages/messages.entity';
@Module({
  imports: [MessagesModule, EventModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'fullstack',
      entities: [Messages],
      synchronize: true,
    })],
  controllers: [],
  providers: []
})
export class AppModule { }
