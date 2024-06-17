import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import dataSource from 'src/data-source/data-source';
import { Status } from 'src/types';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import { Booking } from '../booking/entities/booking.entity';
import { Court } from '../court/entities/court.entity';
import { RentalEquipment } from '../rental-equipment/entities/rental-equipment.entity';
import { Staff } from '../staff/entities/staff.entity';
import { map } from 'lodash';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  // this method can only accept booking status when done
  async create(
    staffRef: EntityRef<Staff>,
    bookingStatus: Status,
    transactionData: Booking,
    note?: string,
  ) {
    if (bookingStatus !== Status.DONE) {
      throw new UnprocessableEntityException(
        'Only status done can be accepted',
      );
    }

    return dataSource.manager.transaction(async (entityManager) => {
      const trxCourtRepository = entityManager.getRepository(Court);
      const trxRentalEquipment = entityManager.getRepository(RentalEquipment);

      const courtData = await trxCourtRepository.findOneByOrFail({
        id: transactionData.court.id,
      });

      const rentalEquipmentIds = map(transactionData.rentalEquipments, 'id');
      const rentalEquipments = await trxRentalEquipment
        .find({
          where: {
            id: In(rentalEquipmentIds),
          },
        })
        .catch(() => {
          throw new NotFoundException('Equipments id not found');
        });

      const transaction = await this.transactionRepository.save(
        this.transactionRepository.create({
          ...transactionData,
          courtName: courtData.name,
          booking: transactionData,
          additionalData: {
            equipments: rentalEquipments,
            note: note,
          },
          createdBy: staffRef,
          updatedBy: staffRef,
        }),
      );

      return transaction;
    });
  }

  findAll() {
    return this.transactionRepository.find();
  }

  findOne(transaction: string) {
    return this.transactionRepository
      .findOneByOrFail({ id: transaction })
      .catch(() => {
        throw new NotFoundException('Transaction id not found');
      });
  }

  // This service can't be updated
  // update() {
  // }

  // This service can't be remove
  // remove() {
  // }
}
