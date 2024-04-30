import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':staffId')
  findOne(@Param('staffId') staffId: string) {
    return this.staffService.findOne(staffId);
  }

  @Patch(':staffId')
  update(
    @Param('staffId') staffId: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    return this.staffService.update(staffId, updateStaffDto);
  }

  @HttpCode(204)
  @Delete(':staffId')
  remove(@Param('staffId') staffId: string) {
    return this.staffService.remove(staffId);
  }
}
