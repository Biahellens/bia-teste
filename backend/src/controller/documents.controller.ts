import { Controller, Post, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { DocumentsService } from '../services/documents.service';
import type { Document } from '../entities/document.entity';
import { extname } from 'node:path';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) { }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname);
          const filename = `<span class="math-inline">\{file\.originalname\.replace\(ext, ''\)\}\-</span>{uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('workspaceId') workspaceId: string,
  ): Promise<Document> {
    return this.documentsService.uploadDocument(file, Number.parseInt(workspaceId, 10));
  }
}