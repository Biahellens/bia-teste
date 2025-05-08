import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Document } from "./document.entity";

@Entity()
export class Workspace {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(
		() => User,
		(user) => user.workspaces,
	)
	@JoinColumn({ name: "userId" })
	user: User;

	@Column()
	userId: number;

	@OneToMany(
		() => Document,
		(document) => document.workspace,
	)
	documents: Document[];
}
