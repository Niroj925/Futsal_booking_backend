import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756033846197 implements MigrationInterface {
    name = 'InitialMigration1756033846197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courtSlot" DROP CONSTRAINT "FK_f04111030a2e31db7420b740822"`);
        await queryRunner.query(`ALTER TABLE "courtSlot" DROP COLUMN "startingAt"`);
        await queryRunner.query(`ALTER TABLE "courtSlot" DROP COLUMN "courtId"`);
        await queryRunner.query(`ALTER TABLE "courtSlot" ADD "startAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courtSlot" ADD "status" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "courtSlot" ADD "futsalId" uuid`);
        await queryRunner.query(`ALTER TABLE "courtSlot" ADD CONSTRAINT "FK_d24f984503d7e8b66788bb254d1" FOREIGN KEY ("futsalId") REFERENCES "futsal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courtSlot" DROP CONSTRAINT "FK_d24f984503d7e8b66788bb254d1"`);
        await queryRunner.query(`ALTER TABLE "courtSlot" DROP COLUMN "futsalId"`);
        await queryRunner.query(`ALTER TABLE "courtSlot" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "courtSlot" DROP COLUMN "startAt"`);
        await queryRunner.query(`ALTER TABLE "courtSlot" ADD "courtId" uuid`);
        await queryRunner.query(`ALTER TABLE "courtSlot" ADD "startingAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courtSlot" ADD CONSTRAINT "FK_f04111030a2e31db7420b740822" FOREIGN KEY ("courtId") REFERENCES "futsalCourt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
