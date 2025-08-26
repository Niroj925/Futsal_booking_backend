import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756055406938 implements MigrationInterface {
    name = 'InitialMigration1756055406938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ADD "court_slot_id" uuid`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "UQ_549f97bbd5bece896a1daef8e8d" UNIQUE ("court_slot_id")`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_549f97bbd5bece896a1daef8e8d" FOREIGN KEY ("court_slot_id") REFERENCES "courtSlot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_549f97bbd5bece896a1daef8e8d"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "UQ_549f97bbd5bece896a1daef8e8d"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "court_slot_id"`);
    }

}
