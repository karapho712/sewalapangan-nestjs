import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Status } from 'src/types';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { Booking } from 'src/modules/booking/entities/booking.entity';

const timeNow = new Date();

const mockTrasnaction: Transaction = {
  occupant: '',
  address: '',
  handphoneNumber: '',
  startDate: timeNow,
  startTime: timeNow,
  endTime: timeNow,
  total: 0,
  courtName: '',
  additionalData: {
    equipments: [],
    note: '',
    priceCourt: 0,
  },
  status: '',
  booking: { id: 'id' },
  createdAt: timeNow,
  updatedAt: timeNow,
  createdBy: {
    id: 'id',
  },
  updatedBy: {
    id: 'id',
  },
  id: '',
};

const mockTransactionRepository = {
  find: jest.fn().mockResolvedValue([mockTrasnaction]),
  findOneBy: jest.fn().mockResolvedValue(mockTrasnaction),
  save: jest.fn().mockResolvedValue(mockTrasnaction),
  create: jest.fn(),
  update: jest.fn(),
  findOneByOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockTrasnaction),
  findOneOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockTrasnaction),
  delete: jest.fn(),
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

const mockBooking: Booking = {
  occupant: '',
  address: '',
  handphoneNumber: '',
  startDate: timeNow,
  startTime: timeNow,
  endTime: timeNow,
  total: 0,
  status: '',
  court: {
    id: 'id',
  },
  rentalEquipments: [],
  createdAt: timeNow,
  updatedAt: timeNow,
  createdBy: {
    id: 'id',
  },
  updatedBy: {
    id: 'id',
  },
  id: '',
};

const mockTransactionService = {
  create: jest.fn().mockResolvedValue(mockTrasnaction),
  findAll: jest.fn().mockResolvedValue([mockTrasnaction]),
  findOne: jest.fn().mockResolvedValue(mockTrasnaction),
};

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockTransactionRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to findAll', async () => {
    await expect(service.findAll()).resolves.toEqual([mockTrasnaction]);
  });

  it('should be able to findOne', async () => {
    await expect(service.findOne(mockTrasnaction.id)).resolves.toEqual(
      mockTrasnaction,
    );
  });

  it('should be able to create', async () => {
    await expect(
      service.create(mockStaff, Status.DONE, mockBooking),
    ).resolves.toEqual(mockTrasnaction);
  });
});
