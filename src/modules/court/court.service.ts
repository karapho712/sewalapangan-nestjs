import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Court } from './entities/court.entity';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';

@Injectable()
export class CourtService {
  constructor(
    @InjectRepository(Court)
    private courtRepository: Repository<Court>,
  ) {}

  async create(staffRef: EntityRef<Staff>, createCourtDto: CreateCourtDto) {
    const court = await this.courtRepository.save(
      this.courtRepository.create({
        ...createCourtDto,
        createdBy: staffRef,
        updatedBy: staffRef,
      }),
    );

    return court;
  }

  findAll() {
    return this.courtRepository.find();
  }

  findOne(courtId: string) {
    return this.courtRepository.findOneByOrFail({ id: courtId }).catch(() => {
      throw new NotFoundException('Court not found');
    });
  }

  async update(
    staffRef: EntityRef<Staff>,
    courtId: string,
    updateCourtDto: UpdateCourtDto,
  ) {
    const court = await this.findOne(courtId);

    return await this.courtRepository.save(
      this.courtRepository.create({
        ...court,
        ...updateCourtDto,
        updatedBy: staffRef,
      }),
    );
  }

  async remove(courtId: string) {
    const court = await this.findOne(courtId);

    await this.courtRepository.delete(courtId);

    return court;
  }
}
