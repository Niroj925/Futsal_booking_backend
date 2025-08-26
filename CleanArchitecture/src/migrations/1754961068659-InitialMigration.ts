import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1754961068659 implements MigrationInterface {
    name = 'InitialMigration1754961068659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" RENAME COLUMN "phone" TO "contact"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" RENAME COLUMN "contact" TO "phone"`);
    }

}
