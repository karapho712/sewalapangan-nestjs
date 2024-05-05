import { MigrationInterface, QueryRunner } from 'typeorm';

export class StaffRolePermissionRelationMigrate1714913337501
  implements MigrationInterface
{
  name = 'StaffRolePermissionRelationMigrate1714913337501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles_permissions" ("roleId" uuid NOT NULL, "permissionId" uuid NOT NULL, CONSTRAINT "PK_5829481fc2a13d85b9b6bf3bd53" PRIMARY KEY ("roleId", "permissionId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_28bf280551eb9aa82daf1e156d" ON "roles_permissions" ("roleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31cf5c31d0096f706e3ba3b1e8" ON "roles_permissions" ("permissionId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "staffs_roles" ("staffId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_f5d6cb089c3d6901bff413ff856" PRIMARY KEY ("staffId", "roleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_21769fb02799bd5c96c2d97edb" ON "staffs_roles" ("staffId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a8ef63702566119aee107b29fd" ON "staffs_roles" ("roleId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_28bf280551eb9aa82daf1e156d9" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_31cf5c31d0096f706e3ba3b1e82" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "staffs_roles" ADD CONSTRAINT "FK_21769fb02799bd5c96c2d97edb7" FOREIGN KEY ("staffId") REFERENCES "staffs"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "staffs_roles" ADD CONSTRAINT "FK_a8ef63702566119aee107b29fd7" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staffs_roles" DROP CONSTRAINT "FK_a8ef63702566119aee107b29fd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staffs_roles" DROP CONSTRAINT "FK_21769fb02799bd5c96c2d97edb7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_31cf5c31d0096f706e3ba3b1e82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_28bf280551eb9aa82daf1e156d9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a8ef63702566119aee107b29fd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_21769fb02799bd5c96c2d97edb"`,
    );
    await queryRunner.query(`DROP TABLE "staffs_roles"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31cf5c31d0096f706e3ba3b1e8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_28bf280551eb9aa82daf1e156d"`,
    );
    await queryRunner.query(`DROP TABLE "roles_permissions"`);
  }
}
