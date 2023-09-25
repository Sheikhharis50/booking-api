import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBooking } from './booking.dto';

@ApiTags('Business')
@Controller('/business')
export class BusinessController {
  @Get('/scheduler')
  @UsePipes(new ValidationPipe())
  async list(@Query() query: QueryBooking) {
    return query;
  }
}
