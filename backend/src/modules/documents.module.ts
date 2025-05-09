import { Module } from '@nestjs/common';
import { DocumentsService } from '../services/documents.service';
import { DocumentsController } from '../controller/documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../entities/document.entity';
import { Workspace } from '../entities/workspace.entity';
import { EmbeddingsModule } from './embeddings.module';

@Module({
	imports: [TypeOrmModule.forFeature([Document, Workspace]), EmbeddingsModule],
	controllers: [DocumentsController],
	providers: [DocumentsService],
})
export class DocumentsModule { }