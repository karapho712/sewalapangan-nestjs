import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const permission = await this.permissionRepository.save(
      this.permissionRepository.create({
        ...createPermissionDto,
      }),
    );

    return permission;
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(permissionId: string) {
    return this.permissionRepository
      .findOneByOrFail({ id: permissionId })
      .catch(() => {
        throw new NotFoundException('Permission not found');
      });
  }

  async update(permissionId: string, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.findOne(permissionId);

    return await this.permissionRepository.save(
      this.permissionRepository.create({
        ...permission,
        ...updatePermissionDto,
      }),
    );
  }

  async remove(permissionId: string) {
    const permission = await this.findOne(permissionId);

    await this.permissionRepository.delete(permissionId);

    return permission;
  }
}
