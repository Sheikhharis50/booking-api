import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AgentAuthHeader } from '@/middlewares/agent-auth';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './permission.dto';

@ApiTags('Permission')
@ApiHeader({ name: AgentAuthHeader, required: true })
@Controller('/permission')
export class PermissionController {
  constructor(private readonly permissionsService: PermissionService) {}

  @Get('/list')
  @ApiResponse({ status: HttpStatus.OK, description: 'Permissions List' })
  async list() {
    return this.permissionsService.list();
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Permission is created',
  })
  async create(@Body() createDto: CreatePermissionDto): Promise<any> {
    return this.permissionsService.create(createDto);
  }
}
