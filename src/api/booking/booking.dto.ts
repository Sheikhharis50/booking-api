import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBooking {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsDateString()
  startAt: string;

  @ApiProperty()
  @IsDateString()
  finishAt: string;
}

export class QueryBooking {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  week?: string;
}
