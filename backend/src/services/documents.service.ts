import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Document } from '../entities/document.entity';
import { Workspace } from '../entities/workspace.entity';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) { }

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

    const savedDocument = await this.documentRepository.save(document);

    if (file.mimetype === 'text/plain') {
      try {
        const filePath = join(process.cwd(), file.path);
        const content = await fs.readFile(filePath, 'utf-8');
        savedDocument.content = content;
        await this.documentRepository.save(savedDocument);
      } catch (error) {
        console.error('Error reading text file:', error);
        savedDocument.errorMessage = 'Error reading file content';
        savedDocument.status = 'failed';
        await this.documentRepository.save(savedDocument);
      } finally {
        await fs.unlink(join(process.cwd(), file.path));
      }
    } else {
      savedDocument.status = 'completed';
      await this.documentRepository.save(savedDocument);
    }

    return savedDocument;
  }
}