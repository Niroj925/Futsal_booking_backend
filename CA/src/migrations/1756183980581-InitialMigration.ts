import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756183980581 implements MigrationInterface {
    name = 'InitialMigration1756183980581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
