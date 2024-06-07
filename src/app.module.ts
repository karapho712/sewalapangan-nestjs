import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { ConfigModule } from '@nestjs/config';
import { StaffModule } from './modules/staff/staff.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { CourtModule } from './modules/court/court.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './modules/auth/guards/jwt.guard';
import { RentalEquipmentModule } from './modules/rental-equipment/rental-equipment.module';
import { BookingModule } from './modules/booking/booking.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot(),
    StaffModule,
    RoleModule,
    PermissionModule,
    CourtModule,
    AuthModule,
    RentalEquipmentModule,
    BookingModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [
    {
      // Make all endpoint need to authenticate
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
