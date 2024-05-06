import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentalEquipmentDto } from './dto/create-rental-equipment.dto';
import { UpdateRentalEquipmentDto } from './dto/update-rental-equipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RentalEquipment } from './entities/rental-equipment.entity';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';

@Injectable()
export class RentalEquipmentService {
  constructor(
    @InjectRepository(RentalEquipment)
    private rentalEquipmentRepository: Repository<RentalEquipment>,
  ) {}

  async create(
    staffRef: EntityRef<Staff>,
    createRentalEquipmentDto: CreateRentalEquipmentDto,
  ) {
    const equipment = await this.rentalEquipmentRepository.save(
      this.rentalEquipmentRepository.create({
        ...createRentalEquipmentDto,
        createdBy: staffRef,
        updatedBy: staffRef,
      }),
    );

    return equipment;
  }

  findAll() {
    return this.rentalEquipmentRepository.find();
  }

  findOne(rentalEquipmentId: string) {
    return this.rentalEquipmentRepository
      .findOneByOrFail({ id: rentalEquipmentId })
      .catch(() => {
        throw new NotFoundException('Equipment not found');
      });
  }

  async update(
    staffRef: EntityRef<Staff>,
    rentalEquipmentId: string,
    updateRentalEquipmentDto: UpdateRentalEquipmentDto,
  ) {
    const equipment = await this.findOne(rentalEquipmentId);

    return await this.rentalEquipmentRepository.save(
      this.rentalEquipmentRepository.create({
        ...equipment,
        ...updateRentalEquipmentDto,
        updatedBy: staffRef,
      }),
    );
  }

  async remove(rentalEquipmentId: string) {
    const equipment = await this.findOne(rentalEquipmentId);

    await this.rentalEquipmentRepository.delete(rentalEquipmentId);

    return equipment;
  }
}
