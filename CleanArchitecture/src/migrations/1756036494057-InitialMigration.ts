import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756036494057 implements MigrationInterface {
    name = 'InitialMigration1756036494057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courtSlot" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "courtSlot" ADD "status" character varying NOT NULL DEFAULT 'AVAILABLE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courtSlot" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "courtSlot" ADD "status" boolean NOT NULL DEFAULT true`);
    }

}
