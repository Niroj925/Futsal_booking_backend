import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756057896637 implements MigrationInterface {
    name = 'InitialMigration1756057896637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_549f97bbd5bece896a1daef8e8d"`);
        await queryRunner.query(`ALTER TABLE "booking" RENAME COLUMN "court_slot_id" TO "time_slot_id"`);
        await queryRunner.query(`ALTER TABLE "booking" RENAME CONSTRAINT "UQ_549f97bbd5bece896a1daef8e8d" TO "UQ_b2006f55084958d4237d6fa63dd"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_b2006f55084958d4237d6fa63dd" FOREIGN KEY ("time_slot_id") REFERENCES "timeSlot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_b2006f55084958d4237d6fa63dd"`);
        await queryRunner.query(`ALTER TABLE "booking" RENAME CONSTRAINT "UQ_b2006f55084958d4237d6fa63dd" TO "UQ_549f97bbd5bece896a1daef8e8d"`);
        await queryRunner.query(`ALTER TABLE "booking" RENAME COLUMN "time_slot_id" TO "court_slot_id"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_549f97bbd5bece896a1daef8e8d" FOREIGN KEY ("court_slot_id") REFERENCES "timeSlot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
