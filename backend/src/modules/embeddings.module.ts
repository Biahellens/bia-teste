import { Module } from '@nestjs/common';
import { EmbeddingsService } from '../services/embeddings.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [EmbeddingsService],
  exports: [EmbeddingsService],
})
export class EmbeddingsModule { }