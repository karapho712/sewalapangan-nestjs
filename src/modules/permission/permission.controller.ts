import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':permissionId')
  findOne(@Param('permissionId') permissionId: string) {
    return this.permissionService.findOne(permissionId);
  }

  @Patch(':permissionId')
  update(
    @Param('permissionId') permissionId: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(permissionId, updatePermissionDto);
  }

  @Delete(':permissionId')
  remove(@Param('permissionId') permissionId: string) {
    return this.permissionService.remove(permissionId);
  }
}
