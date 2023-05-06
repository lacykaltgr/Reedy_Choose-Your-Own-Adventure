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
exports.TransferDto = exports.RemoveBankAccountDto = exports.SetDefaultCreditCardDto = exports.RemoveCreditCardDto = exports.AddCreditCardDto = void 0;
const class_validator_1 = require("class-validator");
class AddCreditCardDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddCreditCardDto.prototype, "paymentMethodId", void 0);
exports.AddCreditCardDto = AddCreditCardDto;
class RemoveCreditCardDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RemoveCreditCardDto.prototype, "paymentMethodId", void 0);
exports.RemoveCreditCardDto = RemoveCreditCardDto;
class SetDefaultCreditCardDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetDefaultCreditCardDto.prototype, "paymentMethodId", void 0);
exports.SetDefaultCreditCardDto = SetDefaultCreditCardDto;
class RemoveBankAccountDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RemoveBankAccountDto.prototype, "bankAccountId", void 0);
exports.RemoveBankAccountDto = RemoveBankAccountDto;
class TransferDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransferDto.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransferDto.prototype, "destination", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TransferDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransferDto.prototype, "currency", void 0);
exports.TransferDto = TransferDto;
//# sourceMappingURL=payments.validation.js.map