import { Workspace } from './workspace.entity';
export declare class User {
    id: number;
    email: string;
    passwordHash: string;
    workspaces: Workspace[];
}
