import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1755137694611 implements MigrationInterface {
    name = 'InitialMigration1755137694611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "UQ_09875ed52a32d84fc460235f1d0" UNIQUE ("contact")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_dd2bcd064eb3b10ad6cd4fcbbb1" UNIQUE ("contact")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_dd2bcd064eb3b10ad6cd4fcbbb1"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "UQ_09875ed52a32d84fc460235f1d0"`);
    }

}
