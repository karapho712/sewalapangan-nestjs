import { Test, TestingModule } from '@nestjs/testing';
import { StaffService } from './staff.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { omit } from 'lodash';

const mockStaffJunior: CreateStaffDto = {
  email: 'email0@email.com',
  name: 'name',
  password: '123456',
  roles: [],
};

const mockStaffSenior: Staff = {
  email: 'email1@email.com',
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
  find: jest.fn().mockResolvedValue([mockStaffJunior]),
  findOneBy: jest.fn().mockResolvedValue(mockStaffJunior),
  save: jest.fn().mockResolvedValue(mockStaffJunior),
  create: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  findOneByOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockStaffJunior),
  findOneOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockStaffJunior),
  delete: jest.fn(),
};

describe('StaffService', () => {
  let service: StaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaffService,
        {
          provide: getRepositoryToken(Staff),
          useValue: mockStaffRepository,
        },
      ],
    }).compile();

    service = module.get<StaffService>(StaffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to findAll', async () => {
    await expect(service.findAll()).resolves.toEqual([mockStaffJunior]);

    expect(mockStaffRepository.find).toBeCalled();
  });

  it('should be able to findOne', async () => {
    await expect(service.findOne(mockStaffSenior.id)).resolves.toEqual(
      mockStaffJunior,
    );

    expect(mockStaffRepository.findOneByOrFail).toBeCalled();
  });

  it('should be able to create', async () => {
    await expect(service.create(mockStaffJunior)).resolves.toEqual(
      omit(mockStaffJunior, ['password']),
    );

    expect(mockStaffRepository.save).toBeCalled();
    expect(mockStaffRepository.create).toBeCalled();
  });

  it('should be able to update', async () => {
    await expect(
      service.update(mockStaffSenior.id, mockStaffJunior),
    ).resolves.toEqual(omit(mockStaffJunior, ['password']));

    expect(mockStaffRepository.save).toBeCalled();
    expect(mockStaffRepository.create).toBeCalled();
  });

  it('should be able to delete', async () => {
    await expect(service.remove(mockStaffSenior.id)).resolves.toEqual(
      mockStaffJunior,
    );

    expect(mockStaffRepository.delete).toBeCalled();
  });
});
