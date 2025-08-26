import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756057575880 implements MigrationInterface {
    name = 'InitialMigration1756057575880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_549f97bbd5bece896a1daef8e8d"`);
        await queryRunner.query(`CREATE TABLE "timeSlot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "startAt" character varying NOT NULL, "endAt" character varying, "status" character varying NOT NULL DEFAULT 'AVAILABLE', "futsalId" uuid, CONSTRAINT "UQ_3afd4fe899147300eaeaf5ad7d3" UNIQUE ("startAt"), CONSTRAINT "UQ_813779cd86d4b9554f42fb6a098" UNIQUE ("endAt"), CONSTRAINT "PK_b31a2098045a14e0b8de6e2e74e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "timeSlot" ADD CONSTRAINT "FK_abde0f909468a6b66d97a7b1e63" FOREIGN KEY ("futsalId") REFERENCES "futsal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_549f97bbd5bece896a1daef8e8d" FOREIGN KEY ("court_slot_id") REFERENCES "timeSlot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_549f97bbd5bece896a1daef8e8d"`);
        await queryRunner.query(`ALTER TABLE "timeSlot" DROP CONSTRAINT "FK_abde0f909468a6b66d97a7b1e63"`);
        await queryRunner.query(`DROP TABLE "timeSlot"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_549f97bbd5bece896a1daef8e8d" FOREIGN KEY ("court_slot_id") REFERENCES "courtSlot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
