import { TicketsModule } from './tickets/tickets.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TicketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
