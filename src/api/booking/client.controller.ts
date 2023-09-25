import { AgentAuthHeader } from '@/middlewares/agent-auth';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateBooking, QueryBooking } from './booking.dto';
import { BookingService } from './booking.service';

@ApiTags('Client')
@ApiHeader({ name: AgentAuthHeader, required: true })
@Controller('/client')
export class ClientController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/scheduler')
  @UsePipes(new ValidationPipe())
  async list(@Query() query: QueryBooking) {
    return this.bookingService.list(query);
  }

  @Post('/booking')
  @UsePipes(new ValidationPipe())
  async create(@Body() createDto: CreateBooking) {
    return this.bookingService.create(createDto);
  }

  @Delete('/booking/:id')
  async delete(@Param('id') id: number) {
    return this.bookingService.delete(id);
  }
}
