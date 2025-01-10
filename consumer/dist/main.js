"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const consumer_module_1 = require("./consumer.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(consumer_module_1.ConsumerModule);
    await app.listen(process.env.CONSUMER_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map