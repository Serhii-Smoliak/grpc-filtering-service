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
exports.ConsumerService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let ConsumerService = class ConsumerService {
    async onModuleInit() {
        if (!this.client) {
            console.error('gRPC client is not initialized');
            return;
        }
        this.userService = this.client.getService('UserService');
        if (this.userService) {
            console.log('UserService initialized');
            await this.displayFilteredUsers();
        }
        else {
            console.error('UserService is not initialized');
        }
    }
    async displayFilteredUsers() {
        try {
            if (this.userService) {
                const response = await (0, rxjs_1.firstValueFrom)(this.userService.GetFilteredUsers({}));
                if (response && response.users) {
                    console.log('Filtered Users:', JSON.stringify(response.users, null, 2));
                }
                else {
                    console.log('No users found');
                }
            }
            else {
                console.error('UserService is not initialized');
            }
        }
        catch (error) {
            console.error('Error during service call:', error);
        }
    }
};
exports.ConsumerService = ConsumerService;
__decorate([
    (0, microservices_1.Client)({
        transport: microservices_1.Transport.GRPC,
        options: {
            url: `${process.env.PRODUCER_URL}:${process.env.PRODUCER_PORT}`,
            package: process.env.PROTO_PACKAGE,
            protoPath: process.env.PROTO_PATH,
        },
    }),
    __metadata("design:type", Object)
], ConsumerService.prototype, "client", void 0);
exports.ConsumerService = ConsumerService = __decorate([
    (0, common_1.Injectable)()
], ConsumerService);
//# sourceMappingURL=consumer.service.js.map