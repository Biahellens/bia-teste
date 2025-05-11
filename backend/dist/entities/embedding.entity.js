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
exports.Embedding = void 0;
const typeorm_1 = require("typeorm");
const document_entity_1 = require("./document.entity");
let Embedding = class Embedding {
    id;
    document;
    documentId;
    vector;
    chunk;
    chunkOrder;
};
exports.Embedding = Embedding;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Embedding.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.Document, (document) => document.embeddings),
    (0, typeorm_1.JoinColumn)({ name: 'documentId' }),
    __metadata("design:type", document_entity_1.Document)
], Embedding.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Embedding.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', array: true }),
    __metadata("design:type", Array)
], Embedding.prototype, "vector", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Embedding.prototype, "chunk", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Embedding.prototype, "chunkOrder", void 0);
exports.Embedding = Embedding = __decorate([
    (0, typeorm_1.Entity)()
], Embedding);
//# sourceMappingURL=embedding.entity.js.map