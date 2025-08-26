import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756187155125 implements MigrationInterface {
    name = 'InitialMigration1756187155125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
