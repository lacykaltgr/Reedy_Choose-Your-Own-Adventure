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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReaderCommentsController = void 0;
const common_1 = require("@nestjs/common");
const reade_comments_service_1 = require("./reade_comments.service");
const local_auth_guard_1 = require("../../users/auth/utils/local.auth.guard");
const reader_comments_validation_1 = require("./reader_comments.validation");
const objectid_validation_1 = require("../../util/objectid.validation");
let ReaderCommentsController = class ReaderCommentsController {
    constructor(readerCommentsService) {
        this.readerCommentsService = readerCommentsService;
    }
    async getReaderComments(id) {
        return this.readerCommentsService.getReaderComments(id);
    }
    async addComment(id, comment) {
        return this.readerCommentsService.addComment(id, comment.user_id, comment.text, comment.username);
    }
    async removeComment(id, comment) {
        return this.readerCommentsService.removeComment(id, comment.user_id, comment.text);
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReaderCommentsController.prototype, "getReaderComments", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Post)(':id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', objectid_validation_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reader_comments_validation_1.CommentDto]),
    __metadata("design:returntype", Promise)
], ReaderCommentsController.prototype, "addComment", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reader_comments_validation_1.CommentDto]),
    __metadata("design:returntype", Promise)
], ReaderCommentsController.prototype, "removeComment", null);
ReaderCommentsController = __decorate([
    (0, common_1.Controller)('reader-comments'),
    __metadata("design:paramtypes", [reade_comments_service_1.ReaderCommentsService])
], ReaderCommentsController);
exports.ReaderCommentsController = ReaderCommentsController;
//# sourceMappingURL=reader_comments.controller.js.map