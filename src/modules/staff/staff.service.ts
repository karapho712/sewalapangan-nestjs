import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import dataSource from 'src/data-source/data-source';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async checkUsedEmail(email: string) {
    const test = await this.staffRepository.findOne({
      where: {
        email: email,
      },
    });
    return test;
  }

  async create(createStaffDto: CreateStaffDto) {
    const checkStaff = await this.checkUsedEmail(createStaffDto.email);
    if (checkStaff) throw new ConflictException('duplicated email');

    const staff = await this.staffRepository.save(
      this.staffRepository.create({
        ...createStaffDto,
      }),
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = staff;

    return rest;
  }

  findAll() {
    return this.staffRepository.find();
  }

  findOne(staffId: string) {
    return this.staffRepository.findOneByOrFail({ id: staffId }).catch(() => {
      throw new NotFoundException('Staff not found');
    });
  }

  async update(staffId: string, updateStaffDto: UpdateStaffDto) {
    if (updateStaffDto.email) {
      const checkStaff = await this.checkUsedEmail(updateStaffDto.email);
      if (checkStaff && checkStaff.id !== staffId)
        throw new ConflictException('Email Already in Use');
    }

    const staff = await this.findOne(staffId);

    const newStaffData = await this.staffRepository.save(
      this.staffRepository.create({
        ...staff,
        ...updateStaffDto,
      }),
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = newStaffData;

    return rest;
  }

  async remove(staffId: string) {
    const staff = await this.findOne(staffId);

    await this.staffRepository.delete(staffId);

    return staff;
  }

  async findByEmail(email: string) {
    const staff = dataSource
      .getRepository(Staff)
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.roles', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .where('staff.email = :email', { email: email })
      .addSelect('staff.password')
      .getOne()
      .catch(() => {
        throw new UnauthorizedException('Staff not found');
      });

    return staff;
  }
}
