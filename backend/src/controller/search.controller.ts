import { Controller, Get, Query } from '@nestjs/common';
import type { SearchService } from '../services/search.service';
import type { Embedding } from '../entities/embedding.entity';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @Get()
  async search(@Query('query') query: string, topK: number): Promise<Embedding[]> {
    return this.searchService.search(query, topK);
  }
}