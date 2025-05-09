import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Document } from '../entities/document.entity';
import { Workspace } from '../entities/workspace.entity';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import type { EmbeddingsService } from './embeddings.service';
import { Embedding } from '../entities/embedding.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(Embedding) // Injete o repositório de Embedding
    private readonly embeddingRepository: Repository<Embedding>,
    private readonly embeddingsService: EmbeddingsService,

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

        savedDocument.content = content;
        await this.documentRepository.save(savedDocument);

        const chunks = await this.chunkDocumentContent(savedDocument, 500, 50);
        console.log('Document Chunks:', chunks);

        const embeddingsPromises = chunks.map(async (chunk) => {
          const embedding = await this.embeddingsService.generateEmbedding(chunk);
          console.log('Embedding:', embedding.slice(0, 5), '...');
          return { chunk, embedding };
        });

        const embeddingsResults = await Promise.all(embeddingsPromises);
        console.log('Embeddings Results:', embeddingsResults.length, 'embeddings generated.');

        for (const result of embeddingsResults) {
          const embeddingEntity = this.embeddingRepository.create({
            document: savedDocument,
            chunk: result.chunk,
            vector: result.embedding,
          });
          await this.embeddingRepository.save(embeddingEntity);
        }

        savedDocument.status = 'completed';
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

  async chunkDocumentContent(document: Document, chunkSize: number, chunkOverlap: number): Promise<string[]> {
    if (!document.content) {
      return [];
    }

    const chunks: string[] = [];
    const lines = document.content.split('\n').filter(line => line.trim() !== '');
    let currentChunk = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const newLine = currentChunk ? `${currentChunk}\n${line}` : line;

      if (newLine.length > chunkSize) {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
          currentChunk = currentChunk.slice(-chunkOverlap).trim();
        } else {
          const words = line.split(' ');
          let currentLongChunk = '';
          for (const word of words) {
            const newLongChunk = currentLongChunk ? `${currentLongChunk} ${word}` : word;
            if (newLongChunk.length > chunkSize) {
              if (currentLongChunk) {
                chunks.push(currentLongChunk.trim());
                currentLongChunk = word;
              } else {
                chunks.push(word.slice(0, chunkSize).trim());
                currentLongChunk = word.slice(chunkSize).trim();
              }
            } else {
              currentLongChunk = newLongChunk;
            }
          }
          if (currentLongChunk) {
            currentChunk = currentLongChunk;
          } else {
            currentChunk = '';
          }
        }
      } else {
        currentChunk = newLine;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }
}