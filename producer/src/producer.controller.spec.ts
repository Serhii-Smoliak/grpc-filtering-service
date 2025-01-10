import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { firstValueFrom } from 'rxjs';
import { from } from 'rxjs';

describe('ProducerController', () => {
  let producerController: ProducerController;

  const mockFilteredUsers = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 3, name: 'Charlie', age: 30 },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [
        {
          provide: ProducerService,
          useValue: {
            getFilteredUsers: jest.fn().mockResolvedValue(mockFilteredUsers),
          },
        },
      ],
    }).compile();

    producerController = app.get<ProducerController>(ProducerController);
  });

  describe('getFilteredUsers', () => {
    it('should return filtered users', async () => {
      const result = await firstValueFrom(from(producerController.getFilteredUsers()));
      expect(result).toEqual(mockFilteredUsers);
    });
  });
});
