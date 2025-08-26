import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756025694668 implements MigrationInterface {
    name = 'InitialMigration1756025694668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_0bfbe73ddb9a092b938be0038d1"`);
        await queryRunner.query(`ALTER TABLE "payment" RENAME COLUMN "priceId" TO "amount"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "amount" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "amount" uuid`);
        await queryRunner.query(`ALTER TABLE "payment" RENAME COLUMN "amount" TO "priceId"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_0bfbe73ddb9a092b938be0038d1" FOREIGN KEY ("priceId") REFERENCES "priceSchem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
