import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddOwnerIdToTelephones1597250413640
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'telephones',
      new TableColumn({
        name: 'owner_id',
        type: 'uuid',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'telephones',
      new TableForeignKey({
        name: 'TelephoneClient',
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'telephones',
      new TableForeignKey({
        name: 'TelephoneContact',
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contacts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('telephones', 'TelephoneContact');
    await queryRunner.dropForeignKey('telephones', 'TelephoneClient');
    await queryRunner.dropColumn('telephones', 'owner_id');
  }
}
