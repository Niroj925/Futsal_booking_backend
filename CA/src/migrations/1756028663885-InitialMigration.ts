import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756028663885 implements MigrationInterface {
    name = 'InitialMigration1756028663885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courtSlot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "startingAt" character varying NOT NULL, "endAt" character varying, "courtId" uuid, CONSTRAINT "PK_fb280377a28269fc6258cb716ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "startAt"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "endAt"`);
        await queryRunner.query(`ALTER TABLE "courtSlot" ADD CONSTRAINT "FK_f04111030a2e31db7420b740822" FOREIGN KEY ("courtId") REFERENCES "futsalCourt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courtSlot" DROP CONSTRAINT "FK_f04111030a2e31db7420b740822"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "endAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "startAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`DROP TABLE "courtSlot"`);
    }

}
