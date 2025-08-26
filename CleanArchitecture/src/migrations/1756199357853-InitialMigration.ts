import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756199357853 implements MigrationInterface {
    name = 'InitialMigration1756199357853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_b2006f55084958d4237d6fa63dd"`);
        await queryRunner.query(`ALTER TABLE "booking" RENAME COLUMN "time_slot_id" TO "timeSlotId"`);
        await queryRunner.query(`ALTER TABLE "booking" RENAME CONSTRAINT "UQ_b2006f55084958d4237d6fa63dd" TO "UQ_5c2844595e0311a7d3b16332736"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "UQ_5c2844595e0311a7d3b16332736"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_5c2844595e0311a7d3b16332736" FOREIGN KEY ("timeSlotId") REFERENCES "timeSlot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_5c2844595e0311a7d3b16332736"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "UQ_5c2844595e0311a7d3b16332736" UNIQUE ("timeSlotId")`);
        await queryRunner.query(`ALTER TABLE "booking" RENAME CONSTRAINT "UQ_5c2844595e0311a7d3b16332736" TO "UQ_b2006f55084958d4237d6fa63dd"`);
        await queryRunner.query(`ALTER TABLE "booking" RENAME COLUMN "timeSlotId" TO "time_slot_id"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_b2006f55084958d4237d6fa63dd" FOREIGN KEY ("time_slot_id") REFERENCES "timeSlot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
