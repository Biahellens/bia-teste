import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Workspace } from '../entities/workspace.entity';
import type { User } from '../entities/user.entity';
import type { CreateWorkspaceDto } from '../dtos/create-workspace.dto';
import type { UpdateWorkspaceDto } from '../dtos/update-workspace.dto';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) { }

  async create(user: User, createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const workspace = this.workspaceRepository.create({ ...createWorkspaceDto, user });
    return this.workspaceRepository.save(workspace);
  }

  async findAll(user: User): Promise<Workspace[]> {
    return this.workspaceRepository.find({ where: { user: { id: user.id } } });
  }

  async findOne(user: User, id: number): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findOne({ where: { id, user: { id: user.id } } });
    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${id} not found for user ${user.id}`);
    }
    return workspace;
  }

  async update(user: User, id: number, updateWorkspaceDto: UpdateWorkspaceDto): Promise<Workspace> {
    const workspace = await this.findOne(user, id);
    this.workspaceRepository.merge(workspace, updateWorkspaceDto);
    return this.workspaceRepository.save(workspace);
  }

  async remove(user: User, id: number): Promise<void> {
    const workspace = await this.findOne(user, id);
    await this.workspaceRepository.remove(workspace);
  }
}