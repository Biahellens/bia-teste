import { Controller, Get, Query } from '@nestjs/common';
import type { SearchService } from '../services/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query('query') query: string, topK:number): Promise<{ chunk: string; filename: string }[]> {
    return this.searchService.search(query, topK);
  }
}