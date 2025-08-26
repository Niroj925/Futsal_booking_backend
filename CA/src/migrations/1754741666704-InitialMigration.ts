import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1754741666704 implements MigrationInterface {
    name = 'InitialMigration1754741666704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "priceSchem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying, "price" integer NOT NULL, "durationMinute" integer NOT NULL, "courtId" uuid, CONSTRAINT "PK_70235ae406e0fef4aeeb2e5df1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "status" character varying, "method" character varying, "proof" character varying, "comment" character varying, "priceId" uuid, "bookingId" uuid, CONSTRAINT "REL_0bfbe73ddb9a092b938be0038d" UNIQUE ("priceId"), CONSTRAINT "REL_5738278c92c15e1ec9d27e3a09" UNIQUE ("bookingId"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "rating" integer NOT NULL, "review" character varying NOT NULL, "adminId" uuid, "userId" uuid, CONSTRAINT "REL_1337f93918c70837d3cea105d3" UNIQUE ("userId"), CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "address" character varying NOT NULL, "contact" character varying, "photo" character varying, "userAuth" uuid, CONSTRAINT "REL_bda2623c72dc59a2cec2080ce2" UNIQUE ("userAuth"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "bookingDate" TIMESTAMP NOT NULL, "startAt" TIMESTAMP NOT NULL, "endAt" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "courtId" uuid, "userId" uuid, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "futsalImage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "image" character varying NOT NULL, "futsalId" uuid, "courtId" uuid, CONSTRAINT "PK_86398911ed32aaf8bdb3575cfe1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "futsalCourt" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "dimension" character varying NOT NULL, "surfaceType" character varying NOT NULL, "availability" character varying NOT NULL, "futsalId" uuid, CONSTRAINT "PK_f2323b64adbc11b19c2a17d58e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "futsal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "description" character varying NOT NULL, "location" character varying NOT NULL, "latitude" double precision, "longitude" double precision, "openAt" character varying NOT NULL, "closeAt" character varying NOT NULL, "futsalAdmin" uuid, CONSTRAINT "REL_bf9b40d14580c3ecfa1a6607fb" UNIQUE ("futsalAdmin"), CONSTRAINT "PK_8d2a6fcf172a2290619e0771c88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "phone" bigint, "photo" character varying, "adminAuth" uuid, CONSTRAINT "REL_8ee6d2e31e9818fbae4ef1def3" UNIQUE ("adminAuth"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "rToken" character varying, CONSTRAINT "UQ_b54f616411ef3824f6a5c06ea46" UNIQUE ("email"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "superAdmin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "photo" character varying, "authId" uuid, CONSTRAINT "REL_600988e4c8ce1ac4a10e154c05" UNIQUE ("authId"), CONSTRAINT "PK_367014cdc288456b24ee5072e1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "priceSchem" ADD CONSTRAINT "FK_3280354330919ef28471f5f3a99" FOREIGN KEY ("courtId") REFERENCES "futsalCourt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_0bfbe73ddb9a092b938be0038d1" FOREIGN KEY ("priceId") REFERENCES "priceSchem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_5738278c92c15e1ec9d27e3a098" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_cd021f3d591fa665eff3671dff6" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_bda2623c72dc59a2cec2080ce2b" FOREIGN KEY ("userAuth") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_af1f96549b26bc9eb36f0afbafb" FOREIGN KEY ("courtId") REFERENCES "futsalCourt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "futsalImage" ADD CONSTRAINT "FK_c318ad21e9a843644c572424c80" FOREIGN KEY ("futsalId") REFERENCES "futsal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "futsalImage" ADD CONSTRAINT "FK_daf37a1ece586dc0b260153d6d3" FOREIGN KEY ("courtId") REFERENCES "futsalCourt"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "futsalCourt" ADD CONSTRAINT "FK_9a4050cec852a27772afdb91e36" FOREIGN KEY ("futsalId") REFERENCES "futsal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "futsal" ADD CONSTRAINT "FK_bf9b40d14580c3ecfa1a6607fb5" FOREIGN KEY ("futsalAdmin") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_8ee6d2e31e9818fbae4ef1def36" FOREIGN KEY ("adminAuth") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "superAdmin" ADD CONSTRAINT "FK_600988e4c8ce1ac4a10e154c051" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "superAdmin" DROP CONSTRAINT "FK_600988e4c8ce1ac4a10e154c051"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_8ee6d2e31e9818fbae4ef1def36"`);
        await queryRunner.query(`ALTER TABLE "futsal" DROP CONSTRAINT "FK_bf9b40d14580c3ecfa1a6607fb5"`);
        await queryRunner.query(`ALTER TABLE "futsalCourt" DROP CONSTRAINT "FK_9a4050cec852a27772afdb91e36"`);
        await queryRunner.query(`ALTER TABLE "futsalImage" DROP CONSTRAINT "FK_daf37a1ece586dc0b260153d6d3"`);
        await queryRunner.query(`ALTER TABLE "futsalImage" DROP CONSTRAINT "FK_c318ad21e9a843644c572424c80"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_af1f96549b26bc9eb36f0afbafb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_bda2623c72dc59a2cec2080ce2b"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_cd021f3d591fa665eff3671dff6"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_5738278c92c15e1ec9d27e3a098"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_0bfbe73ddb9a092b938be0038d1"`);
        await queryRunner.query(`ALTER TABLE "priceSchem" DROP CONSTRAINT "FK_3280354330919ef28471f5f3a99"`);
        await queryRunner.query(`DROP TABLE "superAdmin"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "futsal"`);
        await queryRunner.query(`DROP TABLE "futsalCourt"`);
        await queryRunner.query(`DROP TABLE "futsalImage"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "priceSchem"`);
    }

}
