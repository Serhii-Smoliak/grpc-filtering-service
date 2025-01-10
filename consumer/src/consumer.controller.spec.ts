import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';

describe('ConsumerController', () => {
  let consumerController: ConsumerController;

  const mockFilteredUsers = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 3, name: 'Charlie', age: 30 },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConsumerController],
      providers: [
        {
          provide: ConsumerService,
          useValue: {
            displayFilteredUsers: jest.fn().mockResolvedValue(mockFilteredUsers),
          },
        },
      ],
    }).compile();

    consumerController = app.get<ConsumerController>(ConsumerController);
  });

  describe('getFilteredUsers', () => {
    it('should return filtered users', async () => {
      await consumerController.getFilteredUsers();
      expect(consumerController['consumerService'].displayFilteredUsers).toHaveBeenCalled();
    });
  });
});
