"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const workspace_entity_1 = require("./entities/workspace.entity");
const document_entity_1 = require("./entities/document.entity");
const embedding_entity_1 = require("./entities/embedding.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_URL
                    ? new URL(process.env.DATABASE_URL).hostname
                    : 'db',
                port: process.env.DATABASE_URL
                    ? Number.parseInt(new URL(process.env.DATABASE_URL).port || '5432', 10)
                    : 5432,
                username: process.env.DATABASE_URL
                    ? new URL(process.env.DATABASE_URL).username
                    : 'user123',
                password: process.env.DATABASE_URL
                    ? new URL(process.env.DATABASE_URL).password
                    : 'senha123',
                database: process.env.DATABASE_URL
                    ? new URL(process.env.DATABASE_URL).pathname.substring(1)
                    : 'backendDB',
                entities: [user_entity_1.User, workspace_entity_1.Workspace, document_entity_1.Document, embedding_entity_1.Embedding],
                autoLoadEntities: true,
                synchronize: true,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map