import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourtService } from './court.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';

@Controller('court')
export class CourtController {
  constructor(private readonly courtService: CourtService) {}

  @Post()
  create(@Body() createCourtDto: CreateCourtDto) {
    return this.courtService.create(createCourtDto);
  }

  @Get()
  findAll() {
    return this.courtService.findAll();
  }

  @Get(':courtId')
  findOne(@Param('courtId') courtId: string) {
    return this.courtService.findOne(courtId);
  }

  @Patch(':courtId')
  update(
    @Param('courtId') courtId: string,
    @Body() updateCourtDto: UpdateCourtDto,
  ) {
    return this.courtService.update(courtId, updateCourtDto);
  }

  @Delete(':courtId')
  remove(@Param('courtId') courtId: string) {
    return this.courtService.remove(courtId);
  }
}
