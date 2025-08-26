import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756053481790 implements MigrationInterface {
    name = 'InitialMigration1756053481790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courtSlot" ADD CONSTRAINT "UQ_683ad8fa8a2f74ac01d09bf309a" UNIQUE ("startAt")`);
        await queryRunner.query(`ALTER TABLE "courtSlot" ADD CONSTRAINT "UQ_9f74c6a169eb175c819dffbd2af" UNIQUE ("endAt")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courtSlot" DROP CONSTRAINT "UQ_9f74c6a169eb175c819dffbd2af"`);
        await queryRunner.query(`ALTER TABLE "courtSlot" DROP CONSTRAINT "UQ_683ad8fa8a2f74ac01d09bf309a"`);
    }

}
