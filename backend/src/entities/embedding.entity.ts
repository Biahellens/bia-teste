import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Document } from './document.entity';

@Entity()
export class Embedding {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Document, (document) => document.embeddings)
  @JoinColumn({ name: 'documentId' })
  document: Document;

  @Column()
  documentId: number;

  @Column({ type: 'varchar', array: true })
  vector: number[];

  @Column()
  chunk: string;

  @Column({ type: 'integer' })
  chunkOrder: number;
}
