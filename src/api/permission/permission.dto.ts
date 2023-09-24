import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PermissionType } from './permission.enum';

export class CreatePermissionDto {
  @ApiProperty({ maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  module: string;

  @ApiProperty({ enum: PermissionType, maxLength: 255 })
  @IsNotEmpty()
  @IsEnum(PermissionType)
  type: PermissionType;

  @ApiPropertyOptional({ default: '', maxLength: 1000 })
  @IsString()
  description: string;
}
