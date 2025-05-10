import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DocumentsModule } from "./modules/documents.module";
import { EmbeddingsModule } from "./modules/embeddings.module";
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from "./modules/search.module";
import { AuthModule } from "./modules/auth.module";
import { WorkspacesModule } from "./modules/workspaces.module";
import { Embedding } from "./entities/embedding.entity";
import { Workspace } from "./entities/workspace.entity";
import { Document } from "./entities/document.entity";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		TypeOrmModule.forRoot({
			type: "postgres",
			host: process.env.DATABASE_URL
				? new URL(process.env.DATABASE_URL).hostname
				: "db",
			port: process.env.DATABASE_URL
				? Number.parseInt(new URL(process.env.DATABASE_URL).port || "5432", 10)
				: 5432,
			username: process.env.DATABASE_URL
				? new URL(process.env.DATABASE_URL).username
				: "user123",
			password: process.env.DATABASE_URL
				? new URL(process.env.DATABASE_URL).password
				: "senha123",
			database: process.env.DATABASE_URL
				? new URL(process.env.DATABASE_URL).pathname.substring(1)
				: "backendDB",
			entities: [User, Workspace, Document, Embedding],
			autoLoadEntities: true,
			synchronize: true,
		}),
		AuthModule,
		WorkspacesModule,
		DocumentsModule,
		SearchModule,
		EmbeddingsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }