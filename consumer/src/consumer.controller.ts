import { Controller, Get } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Get('filtered-users')
  async getFilteredUsers(): Promise<void> {
    await this.consumerService.displayFilteredUsers();
  }
}
