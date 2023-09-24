import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ maxLength: 1000, default: '' })
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  permissionIds: number[];
}
