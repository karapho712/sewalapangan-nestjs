import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourtMigration1714915848843 implements MigrationInterface {
  name = 'CourtMigration1714915848843';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "courts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" uuid, "updatedBy" uuid, CONSTRAINT "PK_948a5d356c3083f3237ecbf9897" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "courts" ADD CONSTRAINT "FK_7202968890acbb7d294b0fc0d8b" FOREIGN KEY ("createdBy") REFERENCES "staffs"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courts" ADD CONSTRAINT "FK_c4eb5cc93fc85cd84218b215a6a" FOREIGN KEY ("updatedBy") REFERENCES "staffs"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courts" DROP CONSTRAINT "FK_c4eb5cc93fc85cd84218b215a6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courts" DROP CONSTRAINT "FK_7202968890acbb7d294b0fc0d8b"`,
    );
    await queryRunner.query(`DROP TABLE "courts"`);
  }
}
