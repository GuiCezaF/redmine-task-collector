import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1732623507199 implements MigrationInterface {
  name = 'FirstMigration.ts1732623507199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "project" character varying NOT NULL, "status" character varying NOT NULL, "priority" character varying NOT NULL, "description" text, "dueDate" date, "created_at" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "task"`);
  }
}
