import { OnModuleInit } from '@nestjs/common';
export declare class ConsumerService implements OnModuleInit {
    private userService;
    private client;
    onModuleInit(): Promise<void>;
    displayFilteredUsers(): Promise<void>;
}
