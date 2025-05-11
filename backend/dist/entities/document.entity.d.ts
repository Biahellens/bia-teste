import { Workspace } from './workspace.entity';
import { Embedding } from './embedding.entity';
export declare class Document {
    id: number;
    filename: string;
    path: string;
    mimeType: string;
    createdAt: Date;
    workspace: Workspace;
    workspaceId: number;
    embeddings: Embedding[];
    status: 'pending' | 'processing' | 'completed' | 'failed';
    errorMessage: string;
}
