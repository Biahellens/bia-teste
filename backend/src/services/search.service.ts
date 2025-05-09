import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Embedding } from '../entities/embedding.entity';
import type { EmbeddingsService } from './embeddings.service';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Embedding)
    private readonly embeddingRepository: Repository<Embedding>,
    private readonly embeddingsService: EmbeddingsService,
  ) {}

  async search(query: string, topK: number): Promise<{ chunk: string; filename: string }[]> {
    const queryEmbedding = await this.embeddingsService.generateEmbedding(query);

    const results = await this.embeddingRepository
      .createQueryBuilder('embedding')
      .select([
        'embedding.id',
        'embedding.chunk',
        'embedding.vector',
        'embedding.document',
      ])
      .addSelect('embedding.vector <-> :queryEmbedding', 'similarity')
      .leftJoin('embedding.document', 'document')
      .orderBy('similarity', 'ASC')
      .take(topK)
      .getRawMany();

    return results.map(result => ({
      chunk: result.embedding_chunk,
      filename: result.filename,
    }));
  }
}