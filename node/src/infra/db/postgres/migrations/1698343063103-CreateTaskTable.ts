import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class CreateTaskTable1645459748612 implements MigrationInterface {
  name = 'CreateTaskTable1645459748612'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'dateTime',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'duration',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true
    )

    await queryRunner.createIndex(
      'task',
      new TableIndex({
        name: 'index_task',
        columnNames: ['title', 'description'],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('task', 'index_task')
    await queryRunner.dropTable('task')
  }
}
