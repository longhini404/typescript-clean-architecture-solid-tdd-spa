import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class CreateTagTable1698687701557 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task_tag',
        columns: [
          {
            name: 'taskId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'tagId',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true
    )

    await queryRunner.createIndex(
      'task_tag',
      new TableIndex({
        name: 'index_task_tag_taskId',
        columnNames: ['taskId'],
      })
    )

    await queryRunner.createIndex(
      'task_tag',
      new TableIndex({
        name: 'index_task_tag_tagId',
        columnNames: ['tagId'],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('task_tag', 'index_task_tag_taskId')
    await queryRunner.dropIndex('task_tag', 'index_task_tag_tagId')
    await queryRunner.dropTable('task_tag')
  }
}
