import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { ConfigModule } from '@nestjs/config';
import { StaffModule } from './modules/staff/staff.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot(),
    StaffModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
