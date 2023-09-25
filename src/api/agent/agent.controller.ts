import { Controller, Get, Param } from '@nestjs/common';
import { AgentService } from './agent.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AgentAuthHeader } from '@/middlewares/agent-auth';

@ApiTags('Agent')
@ApiHeader({ name: AgentAuthHeader, required: true })
@Controller('/agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get('/')
  async list() {
    return this.agentService.list();
  }

  @Get('/:id')
  async find(@Param('id') id: string) {
    return this.agentService.find(parseInt(id));
  }
}
