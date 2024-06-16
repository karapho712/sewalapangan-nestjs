import { Test, TestingModule } from '@nestjs/testing';
import { CourtService } from './court.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Court } from './entities/court.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';

const mockCourt: Court = {
  name: '',
  price: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: {
    id: 'id',
  },
  updatedBy: {
    id: 'id',
  },
  id: 'id',
};

const mockStaff: Staff = {
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

const mockCourtRepository = {
  find: jest.fn().mockResolvedValue([mockCourt]),
  findOneBy: jest.fn().mockResolvedValue(mockCourt),
  save: jest.fn().mockResolvedValue(mockCourt),
  create: jest.fn(),
  update: jest.fn(),
  findOneByOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockCourt),
  findOneOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockCourt),
  delete: jest.fn(),
};

describe('CourtService', () => {
  let service: CourtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourtService,
        {
          provide: getRepositoryToken(Court),
          useValue: mockCourtRepository,
        },
      ],
    }).compile();

    service = module.get<CourtService>(CourtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to findAll', async () => {
    await expect(service.findAll()).resolves.toEqual([mockCourt]);

    expect(mockCourtRepository.find).toBeCalled();
  });

  it('should be able to findOne', async () => {
    await expect(service.findOne(mockCourt.id)).resolves.toEqual(mockCourt);

    expect(mockCourtRepository.findOneByOrFail).toBeCalled();
  });

  it('should be able to create', async () => {
    await expect(service.create(mockStaff, mockCourt)).resolves.toEqual(
      mockCourt,
    );

    expect(mockCourtRepository.save).toBeCalled();
    expect(mockCourtRepository.create).toBeCalled();
  });

  it('should be able to update', async () => {
    await expect(
      service.update(mockStaff, mockCourt.id, mockCourt),
    ).resolves.toEqual(mockCourt);

    expect(mockCourtRepository.save).toBeCalled();
    expect(mockCourtRepository.create).toBeCalled();
  });

  it('should be able to delete', async () => {
    await expect(service.remove(mockCourt.id)).resolves.toEqual(mockCourt);

    expect(mockCourtRepository.delete).toBeCalled();
  });
});
