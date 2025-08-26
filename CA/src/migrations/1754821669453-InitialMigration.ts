import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1754821669453 implements MigrationInterface {
    name = 'InitialMigration1754821669453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "status" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
    }

}
