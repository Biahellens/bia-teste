import { User } from './user.entity';
import { Document } from './document.entity';
export declare class Workspace {
    id: number;
    name: string;
    user: User;
    userId: number;
    documents: Document[];
}
