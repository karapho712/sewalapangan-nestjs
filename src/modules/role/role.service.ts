import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.save(
      this.roleRepository.create({
        ...createRoleDto,
      }),
    );

    return role;
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(roleId: string) {
    return this.roleRepository.findOneByOrFail({ id: roleId }).catch(() => {
      throw new NotFoundException('Role not found');
    });
  }

  async update(roleId: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(roleId);

    return await this.roleRepository.save(
      this.roleRepository.create({
        ...role,
        ...updateRoleDto,
      }),
    );
  }

  async remove(roleId: string) {
    const role = await this.findOne(roleId);

    await this.roleRepository.delete(roleId);

    return role;
  }
}
