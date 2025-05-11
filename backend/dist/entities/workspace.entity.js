"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workspace = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const document_entity_1 = require("./document.entity");
let Workspace = class Workspace {
    id;
    name;
    user;
    userId;
    documents;
};
exports.Workspace = Workspace;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Workspace.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Workspace.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.workspaces),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Workspace.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Workspace.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.Document, (document) => document.workspace),
    __metadata("design:type", Array)
], Workspace.prototype, "documents", void 0);
exports.Workspace = Workspace = __decorate([
    (0, typeorm_1.Entity)()
], Workspace);
//# sourceMappingURL=workspace.entity.js.map