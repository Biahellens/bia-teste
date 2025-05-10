import { Injectable, Inject } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config'; // Importe explicitamente ConfigService

@Injectable()
export class EmbeddingsService {
  private readonly openai: OpenAI;
  private readonly embeddingModel: string;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService, 
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY not configured in environment variables.');
    }
    this.openai = new OpenAI({ apiKey });
    this.embeddingModel = this.configService.get<string>('OPENAI_EMBEDDING_MODEL') || 'text-embedding-ada-002';
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: this.embeddingModel,
        input: text,
      });
      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw new Error('Failed to generate embedding.');
    }
  }
}