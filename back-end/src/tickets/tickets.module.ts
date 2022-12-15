import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
