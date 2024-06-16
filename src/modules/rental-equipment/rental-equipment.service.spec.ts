import { Test, TestingModule } from '@nestjs/testing';
import { RentalEquipmentService } from './rental-equipment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RentalEquipment } from './entities/rental-equipment.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';

describe('RentalEquipmentService', () => {
  let service: RentalEquipmentService;

  const mockRentalEquipment: RentalEquipment = {
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
    price: 1000,
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

  const mockRentalEquipmentRepository = {
    find: jest.fn().mockResolvedValue([mockRentalEquipment]),
    findOneBy: jest.fn().mockResolvedValue(mockRentalEquipment),
    save: jest.fn().mockResolvedValue(mockRentalEquipment),
    create: jest.fn(),
    update: jest.fn(),
    findOneByOrFail: jest
      .fn()
      .mockResolvedValue({
        id: '',
      })
      .mockResolvedValue(mockRentalEquipment),
    findOneOrFail: jest
      .fn()
      .mockResolvedValue({
        id: '',
      })
      .mockResolvedValue(mockRentalEquipment),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalEquipmentService,
        {
          provide: getRepositoryToken(RentalEquipment),
          useValue: mockRentalEquipmentRepository,
        },
      ],
    }).compile();

    service = module.get<RentalEquipmentService>(RentalEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to findAll', async () => {
    await expect(service.findAll()).resolves.toEqual([mockRentalEquipment]);

    expect(mockRentalEquipmentRepository.find).toBeCalled();
  });

  it('should be able to findOne', async () => {
    await expect(service.findOne(mockRentalEquipment.id)).resolves.toEqual(
      mockRentalEquipment,
    );

    expect(mockRentalEquipmentRepository.findOneByOrFail).toBeCalled();
  });

  it('should be able to create', async () => {
    await expect(
      service.create(mockStaff, mockRentalEquipment),
    ).resolves.toEqual(mockRentalEquipment);

    expect(mockRentalEquipmentRepository.save).toBeCalled();
    expect(mockRentalEquipmentRepository.create).toBeCalled();
  });

  it('should be able to update', async () => {
    await expect(
      service.update(mockStaff, mockRentalEquipment.id, mockRentalEquipment),
    ).resolves.toEqual(mockRentalEquipment);

    expect(mockRentalEquipmentRepository.save).toBeCalled();
    expect(mockRentalEquipmentRepository.create).toBeCalled();
  });

  it('should be able to delete', async () => {
    await expect(service.remove(mockRentalEquipment.id)).resolves.toEqual(
      mockRentalEquipment,
    );

    expect(mockRentalEquipmentRepository.delete).toBeCalled();
  });
});
