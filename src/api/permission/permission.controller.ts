import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AgentAuthHeader } from '@/middlewares/agent-auth';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './permission.dto';

@ApiTags('Permission')
@ApiHeader({ name: AgentAuthHeader, required: true })
@Controller('/permission')
export class PermissionController {
  constructor(private readonly permissionsService: PermissionService) {}

  @Get('/')
  async list() {
    return this.permissionsService.list();
  }

  @Post('/')
  @UsePipes(new ValidationPipe())
  async create(@Body() createDto: CreatePermissionDto): Promise<any> {
    return this.permissionsService.create(createDto);
  }
}
