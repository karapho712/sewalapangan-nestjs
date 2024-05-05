import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Court } from './entities/court.entity';

@Injectable()
export class CourtService {
  constructor(
    @InjectRepository(Court)
    private courtRepository: Repository<Court>,
  ) {}

  async create(createCourtDto: CreateCourtDto) {
    const court = await this.courtRepository.save(
      this.courtRepository.create({
        ...createCourtDto,
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

  async update(courtId: string, updateCourtDto: UpdateCourtDto) {
    const court = await this.findOne(courtId);

    return await this.courtRepository.save(
      this.courtRepository.create({
        ...court,
        ...updateCourtDto,
      }),
    );
  }

  async remove(courtId: string) {
    const court = await this.findOne(courtId);

    await this.courtRepository.delete(courtId);

    return court;
  }
}
