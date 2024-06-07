import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Editor } from 'src/utils/decorators/editor.decorator';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { Public } from 'src/utils/decorators/public.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @Public()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':bookingId')
  findOne(@Param('bookingId') bookingId: string) {
    return this.bookingService.findOne(bookingId);
  }

  @Patch(':bookingId')
  update(
    @Param('bookingId') bookingId: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Editor() staff: EntityRef<Staff>,
  ) {
    return this.bookingService.update(bookingId, updateBookingDto, staff);
  }

  // Note: user/staff should not remove booking, just do cancel booking (on update service)
  // @Delete(':bookingId')
  // remove(@Param('bookingId') bookingId: string) {
  //   return this.bookingService.remove(bookingId);
  // }
}
