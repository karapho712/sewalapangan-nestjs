import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { TransactionModule } from 'src/modules/transaction/transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), TransactionModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
