import { ConsumerService } from './consumer.service';
export declare class ConsumerController {
    private readonly consumerService;
    constructor(consumerService: ConsumerService);
    getFilteredUsers(): Promise<void>;
}
