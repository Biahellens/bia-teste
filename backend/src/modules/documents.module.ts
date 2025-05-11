// documents.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { DocumentsService } from '../services/documents.service';
import { DocumentsController } from '../controller/documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../entities/document.entity';
import { Workspace } from '../entities/workspace.entity';
import { Embedding } from '../entities/embedding.entity';
import { EmbeddingsModule } from './embeddings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document, Workspace, Embedding]),
    forwardRef(() => EmbeddingsModule), 
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}