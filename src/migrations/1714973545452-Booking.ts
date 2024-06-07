import { MigrationInterface, QueryRunner } from 'typeorm';

export class Booking1714973545452 implements MigrationInterface {
  name = 'Booking1714973545452';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."bookings_status_enum" AS ENUM('BOOKED', 'CANCELED', 'DONE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "occupant" character varying NOT NULL, "address" character varying NOT NULL, "handphoneNumber" character varying NOT NULL, "startDate" date NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, "total" integer NOT NULL, "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'BOOKED', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "courtId" uuid, "createdBy" uuid, "updatedBy" uuid, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "booking_rental_equipments" ("bookingId" uuid NOT NULL, "rentalEquipmentId" uuid NOT NULL, CONSTRAINT "PK_7541d023687760e244c900d10a1" PRIMARY KEY ("bookingId", "rentalEquipmentId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fd2d5636849f46bbab2bc76e9d" ON "booking_rental_equipments" ("bookingId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_02b6ef9cc4882392c69d8a22c9" ON "booking_rental_equipments" ("rentalEquipmentId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD CONSTRAINT "FK_e8e9a995f2078e6c39793a7f16b" FOREIGN KEY ("courtId") REFERENCES "courts"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD CONSTRAINT "FK_d8679eeb989f8943998ee206190" FOREIGN KEY ("createdBy") REFERENCES "staffs"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD CONSTRAINT "FK_f0463e30669ada109d22794a656" FOREIGN KEY ("updatedBy") REFERENCES "staffs"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking_rental_equipments" ADD CONSTRAINT "FK_fd2d5636849f46bbab2bc76e9df" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking_rental_equipments" ADD CONSTRAINT "FK_02b6ef9cc4882392c69d8a22c92" FOREIGN KEY ("rentalEquipmentId") REFERENCES "rental_equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking_rental_equipments" DROP CONSTRAINT "FK_02b6ef9cc4882392c69d8a22c92"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking_rental_equipments" DROP CONSTRAINT "FK_fd2d5636849f46bbab2bc76e9df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_f0463e30669ada109d22794a656"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_d8679eeb989f8943998ee206190"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_e8e9a995f2078e6c39793a7f16b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_02b6ef9cc4882392c69d8a22c9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fd2d5636849f46bbab2bc76e9d"`,
    );
    await queryRunner.query(`DROP TABLE "booking_rental_equipments"`);
    await queryRunner.query(`DROP TABLE "bookings"`);
    await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
  }
}
