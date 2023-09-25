import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { AgentService } from './agent.service';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AgentAuthHeader } from '@/middlewares/agent-auth';

@ApiTags('Agent')
@ApiHeader({ name: AgentAuthHeader, required: true })
@Controller('/agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get('/list')
  @ApiResponse({ status: HttpStatus.OK, description: 'Agents List' })
  async list() {
    return this.agentService.list();
  }

  @Get('/:id/find')
  @ApiResponse({ status: HttpStatus.OK, description: 'Agent Record' })
  async find(@Param('id') id: string) {
    return this.agentService.find(parseInt(id));
  }
}
