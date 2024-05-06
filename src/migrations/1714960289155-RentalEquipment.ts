import { MigrationInterface, QueryRunner } from 'typeorm';

export class RentalEquipment1714960289155 implements MigrationInterface {
  name = 'RentalEquipment1714960289155';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rental_equipments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" uuid, "updatedBy" uuid, CONSTRAINT "PK_b24c2b62ffcdf9728c57dd9828b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "rental_equipments" ADD CONSTRAINT "FK_72aa7efe41b9e93090fa5ebe27b" FOREIGN KEY ("createdBy") REFERENCES "staffs"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rental_equipments" ADD CONSTRAINT "FK_ec70f9d01ee7a855b561399eb31" FOREIGN KEY ("updatedBy") REFERENCES "staffs"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rental_equipments" DROP CONSTRAINT "FK_ec70f9d01ee7a855b561399eb31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rental_equipments" DROP CONSTRAINT "FK_72aa7efe41b9e93090fa5ebe27b"`,
    );
    await queryRunner.query(`DROP TABLE "rental_equipments"`);
  }
}
