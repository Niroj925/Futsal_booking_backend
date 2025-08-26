import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration20250108131338User1736321318901 implements MigrationInterface {
    name = 'Migration20250108131338User1736321318901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "contact" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "contact"`);
    }

}
