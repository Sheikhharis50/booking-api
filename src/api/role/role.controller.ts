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
import { RoleService } from './role.service';
import { AuthHeader } from '@/middlewares/auth';
import { CreateRoleDto } from './role.dto';

@ApiTags('Roles')
@ApiHeader({ name: AuthHeader, required: true })
@Controller('/role')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Get('/list')
  @ApiResponse({ status: HttpStatus.OK, description: 'Roles List' })
  async list() {
    return this.rolesService.list();
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Role is created' })
  async create(@Body() createDto: CreateRoleDto) {
    return this.rolesService.create(createDto);
  }
}
