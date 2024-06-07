import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { TransactionService } from 'src/modules/transaction/transaction.service';
import { RentalEquipment } from '../rental-equipment/entities/rental-equipment.entity';
import dataSource from 'src/db/data-source';
import { Court } from 'src/modules/court/entities/court.entity';
import { map } from 'lodash';
import { Status } from 'src/types';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private transactionService: TransactionService,
  ) {}

  async sumAllTotalPrice(
    courtId: string,
    rentalEquipments?: RentalEquipment[],
  ) {
    return dataSource.manager.transaction(async (entityManager) => {
      const trxCourtRepository = entityManager.getRepository(Court);
      const trxRentalEquipment = entityManager.getRepository(RentalEquipment);

      const courtData = await trxCourtRepository.findOneByOrFail({
        id: courtId,
      });

      let totalPrice = Number(courtData.price);

      if (rentalEquipments) {
        const rentalEquipmentIds = map(rentalEquipments, 'id');
        const rentalEquipmentsData = await trxRentalEquipment
          .find({
            where: {
              id: In(rentalEquipmentIds),
            },
          })
          .catch(() => {
            throw new NotFoundException('Equipments id not found');
          });

        totalPrice = Number(
          rentalEquipmentsData.reduce((total, item) => {
            return Number(item.price) + Number(total);
          }, totalPrice),
        );
      }

      return totalPrice;
    });
  }

  async checkAvailability(startDate: any, startTime: any, endTime: any) {
    const check = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.startDate = :startDate', { startDate: startDate })
      .andWhere('booking.status != :status', {
        status: Status.CANCELED,
      })
      .andWhere(
        '( :startTime BETWEEN booking.startTime AND booking.endTime OR :endTime BETWEEN booking.startTime AND booking.endTime OR booking.startTime BETWEEN :startTime AND :endTime )',
        { startTime, endTime },
      )
      .getOne();

    return check;
  }

  async create(
    createBookingDto: CreateBookingDto,
    staffRef?: EntityRef<Staff> | undefined,
  ) {
    const check = await this.checkAvailability(
      createBookingDto.startDate,
      createBookingDto.startTime,
      createBookingDto.endTime,
    );
    if (check) throw new ConflictException('Already booked');

    return dataSource.manager.transaction(async (entityManager) => {
      const trxBookingRepository = entityManager.getRepository(Booking);

      const totalPriceAll = await this.sumAllTotalPrice(
        createBookingDto.court.id,
        createBookingDto.rentalEquipments,
      );

      return await trxBookingRepository.save(
        this.bookingRepository.create({
          ...createBookingDto,
          total: totalPriceAll,
          createdBy: staffRef,
          updatedBy: staffRef,
        }),
      );
    });
  }

  findAll() {
    return this.bookingRepository.find();
  }

  findOne(bookingId: string) {
    return this.bookingRepository
      .findOneByOrFail({ id: bookingId })
      .catch(() => {
        throw new NotFoundException('Booking id not found');
      });
  }

  async update(
    bookingId: string,
    updateBookingDto: UpdateBookingDto,
    staffRef: EntityRef<Staff>,
  ) {
    const booking = await this.bookingRepository.findOneOrFail({
      where: {
        id: bookingId,
      },
      relations: {
        court: true,
      },
    });

    if (booking.status === Status.CANCELED || booking.status === Status.DONE) {
      throw new NotAcceptableException(
        'Already canceled or done. Create new booking',
      );
    }

    const check = await this.checkAvailability(
      updateBookingDto.startDate,
      updateBookingDto.startTime,
      updateBookingDto.endTime,
    );
    if (check && check.id !== bookingId)
      throw new ConflictException('Already booked');

    return dataSource.manager.transaction(async (entityManager) => {
      const trxBookingRepository = entityManager.getRepository(Booking);

      const totalPriceAll = await this.sumAllTotalPrice(
        updateBookingDto.court.id,
        updateBookingDto.rentalEquipments,
      );

      const trxBooking = await trxBookingRepository.save(
        trxBookingRepository.create({
          ...booking,
          ...updateBookingDto,
          total: totalPriceAll,
          updatedBy: staffRef,
        }),
      );

      if (trxBooking.status === Status.DONE) {
        await this.transactionService.create(
          staffRef,
          trxBooking.status,
          trxBooking,
          updateBookingDto.note,
        );
      }

      return trxBooking;
    });
  }

  async remove(bookingId: string) {
    const booking = await this.findOne(bookingId);

    await this.bookingRepository.delete(bookingId);

    return booking;
  }
}
