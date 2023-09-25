import { Controller, Get, Param } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AgentAuthHeader } from '@/middlewares/agent-auth';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiHeader({ name: AgentAuthHeader, required: true })
  async list() {
    return this.userService.list();
  }

  @Get('/:id')
  async find(@Param('id') id: string) {
    return this.userService.find(parseInt(id));
  }
}
