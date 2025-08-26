import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1755137151925 implements MigrationInterface {
    name = 'InitialMigration1755137151925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_8ee6d2e31e9818fbae4ef1def36"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_bda2623c72dc59a2cec2080ce2b"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_8ee6d2e31e9818fbae4ef1def36" FOREIGN KEY ("adminAuth") REFERENCES "auth"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_bda2623c72dc59a2cec2080ce2b" FOREIGN KEY ("userAuth") REFERENCES "auth"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_bda2623c72dc59a2cec2080ce2b"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_8ee6d2e31e9818fbae4ef1def36"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_bda2623c72dc59a2cec2080ce2b" FOREIGN KEY ("userAuth") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_8ee6d2e31e9818fbae4ef1def36" FOREIGN KEY ("adminAuth") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
