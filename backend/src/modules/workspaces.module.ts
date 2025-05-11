import { Module } from '@nestjs/common';
import { WorkspacesService } from '../services/workspaces.service';
import { WorkspacesController } from '../controller/workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from '../entities/workspace.entity';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace]), AuthModule],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}