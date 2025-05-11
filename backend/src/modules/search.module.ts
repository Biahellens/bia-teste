import { Module } from '@nestjs/common';
import { SearchService } from '../services/search.service';
import { SearchController } from '../controller/search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Embedding } from '../entities/embedding.entity';
import { EmbeddingsModule } from './embeddings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Embedding]), EmbeddingsModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}