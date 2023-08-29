import { Test, TestingModule } from '@nestjs/testing';
import { UserRepo } from './user.repo';

describe('UserRepo', () => {
  let provider: UserRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepo],
    }).compile();

    provider = module.get<UserRepo>(UserRepo);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
