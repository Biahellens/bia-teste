import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Embedding } from '../entities/embedding.entity';
import type { EmbeddingsService } from '../services/embeddings.service';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Embedding)
    private readonly embeddingRepository: Repository<Embedding>,
    private readonly embeddingsService: EmbeddingsService,
  ) { }

  async search(query: string, topK: number): Promise<Embedding[]> {
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
      .orderBy('similarity', 'ASC')
      .setParameter('queryEmbedding', queryEmbedding)
      .take(topK)
      .getMany();

    return results;
  }
}