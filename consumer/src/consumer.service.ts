import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IUserService } from "./interfaces";

@Injectable()
export class ConsumerService implements OnModuleInit {
  private userService: IUserService;

  @Client({
    transport: Transport.GRPC,
    options: {
      url: `${process.env.PRODUCER_URL}:${process.env.PRODUCER_PORT}`,
      package: process.env.PROTO_PACKAGE,
      protoPath: process.env.PROTO_PATH,
    },
  })
  private client: ClientGrpc;

  async onModuleInit() {
    if (!this.client) {
      console.error('gRPC client is not initialized');
      return;
    }
    this.userService = this.client.getService<IUserService>('UserService');
    if (this.userService) {
      console.log('UserService initialized');
      await this.displayFilteredUsers();
    } else {
      console.error('UserService is not initialized');
    }
  }

  async displayFilteredUsers() {
    try {
      if (this.userService) {
        const response = await firstValueFrom(this.userService.GetFilteredUsers({}));

        if (response && response.users) {
          console.log('Filtered Users:', JSON.stringify(response.users, null, 2));
        } else {
          console.log('No users found');
        }
      } else {
        console.error('UserService is not initialized');
      }
    } catch (error) {
      console.error('Error during service call:', error);
    }
  }
}
