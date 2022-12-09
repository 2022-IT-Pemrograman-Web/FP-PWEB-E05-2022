import { TicketsService } from './tickets.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Get()
  getAllTickets() {
    return this.ticketService.getAllTickets();
  }

  @Get(':ticketId')
  getTicket(@Param('ticketId') ticketId: string) {
    return this.ticketService.getTicket(ticketId);
  }

  @Post()
  insertTicket(
    @Body('merk') merk: string,
    @Body('jenis') jenis: string,
    @Body('asal') asal: string,
    @Body('tujuan') tujuan: string,
    @Body('harga') harga: number,
    @Body('jumlah') jumlah: number,
    @Body('waktuasal') waktuasal: number,
    @Body('waktutujuan') waktutujuan: number,
    @Body('user') user: string,
    @Body('username') username: string,
  ) {
    return this.ticketService.insertTicket(
      merk,
      jenis,
      asal,
      tujuan,
      harga,
      jumlah,
      waktuasal,
      waktutujuan,
      user,
      username,
    );
  }

  @Put(':ticketId')
  updateTicket(
    @Param('ticketId') ticketId: string,
    @Body('merk') merk: string,
    @Body('jenis') jenis: string,
    @Body('asal') asal: string,
    @Body('tujuan') tujuan: string,
    @Body('harga') harga: number,
    @Body('jumlah') jumlah: number,
    @Body('waktuasal') waktuasal: number,
    @Body('waktutujuan') waktutujuan: number,
    @Body('user') user: string,
    @Body('username') username: string,
  ) {
    return this.ticketService.updateTicket(
      ticketId,
      merk,
      jenis,
      asal,
      tujuan,
      harga,
      jumlah,
      waktuasal,
      waktutujuan,
      user,
      username,
    );
  }

  @Delete(':ticketId')
  deleteTicket(@Param('ticketId') ticketId: string) {
    return this.ticketService.deleteTicket(ticketId);
  }
}
