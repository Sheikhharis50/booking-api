import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AgentAuthHeader } from '@/middlewares/agent-auth';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  @ApiHeader({ name: AgentAuthHeader, required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Users List' })
  async list() {
    return this.userService.list();
  }

  @Get('/:id/find')
  @ApiResponse({ status: HttpStatus.OK, description: 'User Record' })
  async find(@Param('id') id: string) {
    return this.userService.find(parseInt(id));
  }
}
