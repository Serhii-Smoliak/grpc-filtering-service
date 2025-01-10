"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const producer_module_1 = require("./producer.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(producer_module_1.ProducerModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.GRPC,
        options: {
            url: `${process.env.PRODUCER_URL}:${process.env.PRODUCER_PORT}`,
            package: process.env.PROTO_PACKAGE,
            protoPath: process.env.PROTO_PATH,
        },
    });
    await app.startAllMicroservices();
    console.log('Producer is running...');
}
bootstrap();
//# sourceMappingURL=main.js.map