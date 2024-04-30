import { MigrationInterface, QueryRunner } from 'typeorm';

export class StaffMigration1714452982254 implements MigrationInterface {
  name = 'StaffMigration1714452982254';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "staffs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" uuid, "updatedBy" uuid, CONSTRAINT "UQ_fc7b6dc314d349acb74a6124fe9" UNIQUE ("email"), CONSTRAINT "PK_f3fec5e06209b46afdf8accf117" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "staffs" ADD CONSTRAINT "FK_b377e025726f65e973b11a0c39b" FOREIGN KEY ("createdBy") REFERENCES "staffs"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staffs" ADD CONSTRAINT "FK_eb7308a475c4c0bf1b890685ccf" FOREIGN KEY ("updatedBy") REFERENCES "staffs"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staffs" DROP CONSTRAINT "FK_eb7308a475c4c0bf1b890685ccf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staffs" DROP CONSTRAINT "FK_b377e025726f65e973b11a0c39b"`,
    );
    await queryRunner.query(`DROP TABLE "staffs"`);
  }
}
