import {MigrationInterface, QueryRunner} from "typeorm";

export class ProjectTable1648804519262 implements MigrationInterface {
    name = 'ProjectTable1648804519262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "projectid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_7c63b8df32ad434774626a44174" PRIMARY KEY ("projectid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
