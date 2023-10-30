import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class CreateUser1641656384004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cellphone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'varchar',
            length: '1',
            isNullable: false,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'int',
            isNullable: false,
            default: 1,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true
    )

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USER',
        columnNames: ['name', 'email', 'cellphone'],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('user', 'IDX_USER')
    await queryRunner.dropTable('user')
  }
}
