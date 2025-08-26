import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756172890651 implements MigrationInterface {
    name = 'InitialMigration1756172890651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP CONSTRAINT "UQ_792c1e513461f2dd66de0adc12b"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP CONSTRAINT "UQ_bdc8d797c3af238daf8633b41f9"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD CONSTRAINT "UQ_bdc8d797c3af238daf8633b41f9" UNIQUE ("endMin")`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD CONSTRAINT "UQ_792c1e513461f2dd66de0adc12b" UNIQUE ("startMin")`);
    }

}
