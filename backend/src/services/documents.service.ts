import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Document } from '../entities/document.entity';
import { Workspace } from '../entities/workspace.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async uploadDocument(
    file: Express.Multer.File,
    workspaceId: number,
  ): Promise<Document> {
    const workspace = await this.workspaceRepository.findOneBy({
      id: workspaceId,
    });
    if (!workspace) {
      throw new Error(`Workspace with ID ${workspaceId} not found`);
    }

    const document = this.documentRepository.create({
      filename: file.originalname,
      path: file.path,
      mimeType: file.mimetype,
      workspace,
    });

    return this.documentRepository.save(document);
  }
}