import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRole: Role = {
  name: 'permission',
  createdBy: {
    id: 'id',
  },
  updatedBy: {
    id: 'id',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  id: '',
  kebabCaseSlug: function (): void {},
  slug: '',
  permissions: [],
};

const mockRoleRepository = {
  find: jest.fn().mockResolvedValue([mockRole]),
  findOneBy: jest.fn().mockResolvedValue(mockRole),
  save: jest.fn().mockResolvedValue(mockRole),
  create: jest.fn(),
  update: jest.fn(),
  findOneByOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockRole),
  findOneOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockRole),
  delete: jest.fn(),
};

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to findAll', async () => {
    await expect(service.findAll()).resolves.toEqual([mockRole]);

    expect(mockRoleRepository.find).toBeCalled();
  });

  it('should be able to findOne', async () => {
    await expect(service.findOne(mockRole.id)).resolves.toEqual(mockRole);

    expect(mockRoleRepository.findOneByOrFail).toBeCalled();
  });

  it('should be able to create', async () => {
    await expect(service.create(mockRole)).resolves.toEqual(mockRole);

    expect(mockRoleRepository.save).toBeCalled();
    expect(mockRoleRepository.create).toBeCalled();
  });

  it('should be able to update', async () => {
    await expect(service.update(mockRole.id, mockRole)).resolves.toEqual(
      mockRole,
    );

    expect(mockRoleRepository.save).toBeCalled();
    expect(mockRoleRepository.create).toBeCalled();
  });

  it('should be able to delete', async () => {
    await expect(service.remove(mockRole.id)).resolves.toEqual(mockRole);

    expect(mockRoleRepository.delete).toBeCalled();
  });
});
