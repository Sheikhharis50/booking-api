import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { AgentAuthHeader } from '@/middlewares/agent-auth';
import { CreateRoleDto } from './role.dto';

@ApiTags('Roles')
@ApiHeader({ name: AgentAuthHeader, required: true })
@Controller('/role')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Get('/')
  async list() {
    return this.rolesService.list();
  }

  @Post('/')
  @UsePipes(new ValidationPipe())
  async create(@Body() createDto: CreateRoleDto) {
    return this.rolesService.create(createDto);
  }
}
