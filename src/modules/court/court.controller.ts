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
import { CourtService } from './court.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { RequiredPermissions } from 'src/utils/decorators/required-permissions.decorator';
import { Editor } from 'src/utils/decorators/editor.decorator';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { PermissionGuard } from 'src/modules/auth/guards/permission.guard';

@Controller('court')
@UseGuards(PermissionGuard)
export class CourtController {
  constructor(private readonly courtService: CourtService) {}

  @Post()
  @RequiredPermissions('api.create.court')
  create(
    @Editor() staff: EntityRef<Staff>,
    @Body() createCourtDto: CreateCourtDto,
  ) {
    return this.courtService.create(staff, createCourtDto);
  }

  @Get()
  @RequiredPermissions('api.view.court')
  findAll() {
    return this.courtService.findAll();
  }

  @Get(':courtId')
  @RequiredPermissions('api.view.court')
  findOne(@Param('courtId') courtId: string) {
    return this.courtService.findOne(courtId);
  }

  @Patch(':courtId')
  @RequiredPermissions('api.update.court')
  update(
    @Editor() staff: EntityRef<Staff>,
    @Param('courtId') courtId: string,
    @Body() updateCourtDto: UpdateCourtDto,
  ) {
    return this.courtService.update(staff, courtId, updateCourtDto);
  }

  @Delete(':courtId')
  @RequiredPermissions('api.delete.court')
  remove(@Param('courtId') courtId: string) {
    return this.courtService.remove(courtId);
  }
}
