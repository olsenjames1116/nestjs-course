import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(
      controller.create({
        name: 'Jack',
        email: 'jack@fakemail.com',
        role: 'INTERN',
      }),
    ).toEqual({
      id: expect.any(Number),
      name: 'Jack',
      email: 'jack@fakemail.com',
      role: 'INTERN',
    });
  });

  it('should update a user', () => {
    const dto = { name: 'Jill', email: 'jill@fakemail.com' };

    expect(controller.update(1, dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
  });
});
