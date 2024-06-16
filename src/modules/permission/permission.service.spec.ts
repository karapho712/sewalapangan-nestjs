import { Test, TestingModule } from '@nestjs/testing';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockPermission: Permission = {
  dotCase: function (): void {},
  name: 'permission',
  key: 'permission',
  createdBy: {
    id: 'id',
  },
  updatedBy: {
    id: 'id',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  id: '',
};

const mockPermissionRepository = {
  find: jest.fn().mockResolvedValue([mockPermission]),
  findOneBy: jest.fn().mockResolvedValue(mockPermission),
  save: jest.fn().mockResolvedValue(mockPermission),
  create: jest.fn(),
  update: jest.fn(),
  findOneByOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockPermission),
  findOneOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockPermission),
  delete: jest.fn(),
};

describe('PermissionService', () => {
  let service: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: getRepositoryToken(Permission),
          useValue: mockPermissionRepository,
        },
      ],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to findAll', async () => {
    await expect(service.findAll()).resolves.toEqual([mockPermission]);

    expect(mockPermissionRepository.find).toBeCalled();
  });

  it('should be able to findOne', async () => {
    await expect(service.findOne(mockPermission.id)).resolves.toEqual(
      mockPermission,
    );

    expect(mockPermissionRepository.findOneByOrFail).toBeCalled();
  });

  it('should be able to create', async () => {
    await expect(service.create(mockPermission)).resolves.toEqual(
      mockPermission,
    );

    expect(mockPermissionRepository.save).toBeCalled();
    expect(mockPermissionRepository.create).toBeCalled();
  });

  it('should be able to update', async () => {
    await expect(
      service.update(mockPermission.id, mockPermission),
    ).resolves.toEqual(mockPermission);

    expect(mockPermissionRepository.save).toBeCalled();
    expect(mockPermissionRepository.create).toBeCalled();
  });

  it('should be able to delete', async () => {
    await expect(service.remove(mockPermission.id)).resolves.toEqual(
      mockPermission,
    );

    expect(mockPermissionRepository.delete).toBeCalled();
  });
});
