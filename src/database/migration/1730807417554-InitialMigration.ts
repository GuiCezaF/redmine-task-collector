import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1730807417554 implements MigrationInterface {
    name = 'InitialMigration1730807417554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "project" varchar NOT NULL, "status" varchar NOT NULL, "priority" varchar NOT NULL, "description" text NOT NULL, "dueDate" date)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
