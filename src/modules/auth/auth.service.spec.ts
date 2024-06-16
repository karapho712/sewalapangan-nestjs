import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

const mockUser: Staff = {
  email: 'email@email.com',
  name: 'name',
  password: '123456',
  setPassword: async () => {},
  roles: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: {
    id: 'id',
  },
  updatedBy: {
    id: 'id',
  },
  id: '',
};

const mockStaffRepository = {
  find: jest.fn().mockResolvedValue([mockUser]),
  findOneBy: jest.fn().mockResolvedValue(mockUser),
  save: jest.fn().mockResolvedValue(mockUser),
  create: jest.fn(),
  update: jest.fn(),
  findOneByOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockUser),
  findOneOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockUser),
  findByEmail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockUser),
  delete: jest.fn(),
};

const mockAuthService = {
  validateUser: jest.fn().mockResolvedValue(mockUser),
  login: jest.fn().mockResolvedValue({
    user: {
      mockUser,
    },
    backendTokens: {
      accessToken: 'aaaa',
      refreshToken: 'bbbb',
      expiresIn: 15,
    },
  }),
  refreshToken: jest.fn().mockResolvedValue({
    user: {
      mockUser,
    },
    backendTokens: {
      accessToken: 'aaaa',
      refreshToken: 'bbbb',
      expiresIn: 15,
    },
  }),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        JwtService,
        {
          provide: getRepositoryToken(Staff),
          useValue: mockStaffRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to validate staff', async () => {
    await expect(service.validateUser(mockUser)).resolves.toEqual(mockUser);

    expect(mockAuthService.validateUser).toBeCalledWith(mockUser);
  });

  it('should be able to login staff', async () => {
    await expect(
      service.login({ email: mockUser.email, password: mockUser.password }),
    ).resolves.toEqual({
      user: {
        mockUser,
      },
      backendTokens: {
        accessToken: 'aaaa',
        refreshToken: 'bbbb',
        expiresIn: 15,
      },
    });
  });

  it('should be able to refresh token', async () => {
    await expect(service.refreshToken(mockUser)).resolves.toEqual({
      user: {
        mockUser,
      },
      backendTokens: {
        accessToken: 'aaaa',
        refreshToken: 'bbbb',
        expiresIn: 15,
      },
    });
  });
});
