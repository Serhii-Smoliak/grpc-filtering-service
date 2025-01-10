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
exports.ProducerController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const fs = require("fs/promises");
let ProducerController = class ProducerController {
    async getFilteredUsers() {
        const filePath = (0, path_1.join)(__dirname, '..', 'src', 'data', 'users.json');
        try {
            await fs.access(filePath);
            const fileContent = await fs.readFile(filePath, 'utf8');
            const users = JSON.parse(fileContent);
            const filteredUsers = users.filter((user) => user.age > 18);
            return { users: filteredUsers };
        }
        catch (error) {
            console.error('Error reading file:', filePath, error);
            throw new Error(`File not found: ${filePath}`);
        }
    }
};
exports.ProducerController = ProducerController;
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'GetFilteredUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProducerController.prototype, "getFilteredUsers", null);
exports.ProducerController = ProducerController = __decorate([
    (0, common_1.Controller)()
], ProducerController);
//# sourceMappingURL=producer.controller.js.map