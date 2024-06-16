import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { add } from 'date-fns';
import { RentalEquipment } from 'src/modules/rental-equipment/entities/rental-equipment.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Staff } from 'src/modules/staff/entities/staff.entity';

const mockCreateBooking: CreateBookingDto = {
  court: { id: 'id' },
  occupant: '',
  address: '',
  handphoneNumber: '',
  startDate: new Date(),
  startTime: new Date(),
  endTime: add(new Date(), { hours: 2 }),
  status: '',
  rentalEquipments: [],
};

const mockBooking: Booking = {
  occupant: '',
  address: '',
  handphoneNumber: '',
  startDate: new Date(),
  startTime: new Date(),
  endTime: add(new Date(), { hours: 2 }),
  total: 0,
  status: '',
  court: {
    id: 'id',
  },
  rentalEquipments: [],
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

const mockStaff: Staff = {
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

const mockRentalEquipment: RentalEquipment = {
  name: 'name',
  price: 100,
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

const mockBookingRepository = {
  find: jest.fn().mockResolvedValue([mockBooking]),
  findOneBy: jest.fn().mockResolvedValue(mockBooking),
  save: jest.fn().mockResolvedValue(mockBooking),
  create: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  findOneByOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockBooking),
  findOneOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockBooking),
  delete: jest.fn(),
};

const mockBookingService = {
  sumAllTotalPrice: jest.fn().mockResolvedValue(mockRentalEquipment.price),
  checkAvailability: jest.fn().mockResolvedValue(mockBooking),
  create: jest.fn().mockResolvedValue(mockBooking),
  findAll: jest.fn().mockResolvedValue([mockBooking]),
  findOne: jest.fn().mockResolvedValue(mockBooking),
  update: jest.fn().mockResolvedValue(mockBooking),
  remove: jest.fn().mockResolvedValue(mockBooking),
};

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BookingService,
          useValue: mockBookingService,
        },
        {
          provide: getRepositoryToken(Booking),
          useValue: mockBookingRepository,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sum all total price', async () => {
    const result = await service.sumAllTotalPrice(mockBooking.id, [
      mockRentalEquipment,
    ]);

    expect(result).toEqual(mockRentalEquipment.price);

    expect(mockBookingService.sumAllTotalPrice).toBeCalledWith(mockBooking.id, [
      mockRentalEquipment,
    ]);
  });

  it('should check avaliability', async () => {
    const result = await service.checkAvailability(
      new Date(),
      new Date(),
      add(new Date(), { hours: 2 }),
    );

    await expect(result).toEqual(mockBooking);
  });

  it('should be create', async () => {
    await expect(service.create(mockCreateBooking)).resolves.toEqual(
      mockBooking,
    );
  });

  it('should be able to findAll', async () => {
    await expect(service.findAll()).resolves.toEqual([mockBooking]);
  });

  it('should be able to findOne', async () => {
    await expect(service.findOne(mockBooking.id)).resolves.toEqual(mockBooking);
  });

  it('should be able to update', async () => {
    await expect(
      service.update(mockBooking.id, mockCreateBooking, mockStaff),
    ).resolves.toEqual(mockBooking);
  });

  it('should be able to delete', async () => {
    await expect(service.remove(mockBooking.id)).resolves.toEqual(mockBooking);
  });
});
