import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { join } from 'path';
import * as fs from 'fs/promises';

@Controller()
export class ProducerController {
  @GrpcMethod('UserService', 'GetFilteredUsers')
  async getFilteredUsers() {
    const filePath = join(__dirname, '..', 'src', 'data', 'users.json');

    try {
      await fs.access(filePath);

      const fileContent = await fs.readFile(filePath, 'utf8');

      const users = JSON.parse(fileContent);

      const filteredUsers = users.filter((user) => user.age > 18);

      return { users: filteredUsers };
    } catch (error) {
      console.error('Error reading file:', filePath, error);
      throw new Error(`File not found: ${filePath}`);
    }
  }
}
