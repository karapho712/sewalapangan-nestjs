import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RentalEquipmentService } from './rental-equipment.service';
import { CreateRentalEquipmentDto } from './dto/create-rental-equipment.dto';
import { UpdateRentalEquipmentDto } from './dto/update-rental-equipment.dto';
import { PermissionGuard } from 'src/modules/auth/guards/permission.guard';
import { Editor } from 'src/utils/decorators/editor.decorator';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import { Staff } from '../staff/entities/staff.entity';

@Controller('rental-equipment')
@UseGuards(PermissionGuard)
export class RentalEquipmentController {
  constructor(
    private readonly rentalEquipmentService: RentalEquipmentService,
  ) {}

  @Post()
  // @RequiredPermissions('api.create.rentalequipment')
  create(
    @Editor() staff: EntityRef<Staff>,
    @Body() createRentalEquipmentDto: CreateRentalEquipmentDto,
  ) {
    return this.rentalEquipmentService.create(staff, createRentalEquipmentDto);
  }

  @Get()
  findAll() {
    return this.rentalEquipmentService.findAll();
  }

  @Get(':rentalEquipmentId')
  findOne(@Param('rentalEquipmentId') rentalEquipmentId: string) {
    return this.rentalEquipmentService.findOne(rentalEquipmentId);
  }

  @Patch(':rentalEquipmentId')
  update(
    @Editor() staff: EntityRef<Staff>,
    @Param('rentalEquipmentId') rentalEquipmentId: string,
    @Body() updateRentalEquipmentDto: UpdateRentalEquipmentDto,
  ) {
    return this.rentalEquipmentService.update(
      staff,
      rentalEquipmentId,
      updateRentalEquipmentDto,
    );
  }

  @Delete(':rentalEquipmentId')
  remove(@Param('rentalEquipmentId') rentalEquipmentId: string) {
    return this.rentalEquipmentService.remove(rentalEquipmentId);
  }
}
