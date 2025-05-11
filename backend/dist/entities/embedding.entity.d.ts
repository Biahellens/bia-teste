import { Document } from './document.entity';
export declare class Embedding {
    id: number;
    document: Document;
    documentId: number;
    vector: number[];
    chunk: string;
    chunkOrder: number;
}
