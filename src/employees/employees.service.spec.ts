import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { DatabaseService } from '../database/database.service';

describe('EmployeesService', () => {
  let service: EmployeesService;
  const mockDatabaseService = {
    employee: { create: jest.fn().mockImplementation((dto) => dto) },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    expect(
      await service.create({
        name: 'Joseph',
        email: 'joseph@email.com',
        role: 'INTERN',
      }),
    ).toStrictEqual({
      data: {
        name: 'Joseph',
        email: 'joseph@email.com',
        role: 'INTERN',
      },
    });
  });
});
