import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration20250107235959_1736273699795 implements MigrationInterface {
    name = 'Migration20250107235959_1736273699795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "contact"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "contact" character varying`);
    }

}
