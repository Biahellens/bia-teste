import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, ValidationPipe, Request } from '@nestjs/common';
import type { WorkspacesService } from '../services/workspaces.service';
import type { CreateWorkspaceDto } from '../dtos/create-workspace.dto';
import type { UpdateWorkspaceDto } from '../dtos/update-workspace.dto';
import { JwtAuthGuard } from '../middleware/jwt-auth.guard';
import type { Workspace } from '../entities/workspace.entity';

@UseGuards(JwtAuthGuard)
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) { }

  @Post()
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async create(@Request() req: any, @Body(ValidationPipe) createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    return this.workspacesService.create(req.user, createWorkspaceDto);
  }

  @Get()
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async findAll(@Request() req: any): Promise<Workspace[]> {
    return this.workspacesService.findAll(req.user);
  }

  @Get(':id')
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async findOne(@Request() req: any, @Param('id') id: string): Promise<Workspace> {
    return this.workspacesService.findOne(req.user, Number.parseInt(id, 10));
  }

  @Patch(':id')
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async update(@Request() req: any, @Param('id') id: string, @Body(ValidationPipe) updateWorkspaceDto: UpdateWorkspaceDto): Promise<Workspace> {
    return this.workspacesService.update(req.user, Number.parseInt(id, 10), updateWorkspaceDto);
  }

  @Delete(':id')
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async remove(@Request() req: any, @Param('id') id: string): Promise<void> {
    return this.workspacesService.remove(req.user, Number.parseInt(id, 10));
  }
}