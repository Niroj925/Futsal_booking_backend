import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1755413819257 implements MigrationInterface {
    name = 'InitialMigration1755413819257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ADD "status" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "status"`);
    }

}
