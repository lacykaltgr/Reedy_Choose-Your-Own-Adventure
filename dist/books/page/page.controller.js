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
exports.PageController = void 0;
const common_1 = require("@nestjs/common");
const objectid_validation_1 = require("../../util/objectid.validation");
const page_service_1 = require("./page.service");
const local_auth_guard_1 = require("../../users/auth/utils/local.auth.guard");
let PageController = class PageController {
    constructor(pageService) {
        this.pageService = pageService;
    }
    async getPage(pageId) {
        const page = await this.pageService.getPageById(pageId);
        return page;
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Get)(':pageid'),
    __param(0, (0, common_1.Param)('pageid', objectid_validation_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "getPage", null);
PageController = __decorate([
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.Controller)('page'),
    __metadata("design:paramtypes", [page_service_1.PageService])
], PageController);
exports.PageController = PageController;
//# sourceMappingURL=page.controller.js.map