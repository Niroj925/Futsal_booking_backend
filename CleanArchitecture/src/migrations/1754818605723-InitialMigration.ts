import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1754818605723 implements MigrationInterface {
    name = 'InitialMigration1754818605723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" ALTER COLUMN "role" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" ALTER COLUMN "role" SET NOT NULL`);
    }

}
