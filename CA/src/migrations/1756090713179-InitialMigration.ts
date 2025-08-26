import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756090713179 implements MigrationInterface {
    name = 'InitialMigration1756090713179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP CONSTRAINT "UQ_3afd4fe899147300eaeaf5ad7d3"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP COLUMN "startAt"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP CONSTRAINT "UQ_813779cd86d4b9554f42fb6a098"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP COLUMN "endAt"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD "startHr" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD CONSTRAINT "UQ_3809ad44195a6872cfc964cf5db" UNIQUE ("startHr")`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD "startMin" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD CONSTRAINT "UQ_792c1e513461f2dd66de0adc12b" UNIQUE ("startMin")`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD "endHr" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD CONSTRAINT "UQ_f6e798944b549921e46af79cc13" UNIQUE ("endHr")`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD "endMin" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD CONSTRAINT "UQ_bdc8d797c3af238daf8633b41f9" UNIQUE ("endMin")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP CONSTRAINT "UQ_bdc8d797c3af238daf8633b41f9"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP COLUMN "endMin"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP CONSTRAINT "UQ_f6e798944b549921e46af79cc13"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP COLUMN "endHr"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP CONSTRAINT "UQ_792c1e513461f2dd66de0adc12b"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP COLUMN "startMin"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP CONSTRAINT "UQ_3809ad44195a6872cfc964cf5db"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP COLUMN "startHr"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD "endAt" character varying`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD CONSTRAINT "UQ_813779cd86d4b9554f42fb6a098" UNIQUE ("endAt")`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD "startAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD CONSTRAINT "UQ_3afd4fe899147300eaeaf5ad7d3" UNIQUE ("startAt")`);
    }

}
