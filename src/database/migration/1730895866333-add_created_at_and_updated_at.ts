import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAtAndUpdatedAt1730895866333
  implements MigrationInterface
{
  name = 'AddCreatedAtAndUpdatedAt1730895866333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "project" varchar NOT NULL, "status" varchar NOT NULL, "priority" varchar NOT NULL, "description" text, "dueDate" date, "created_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "task"`);
  }
}
