import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddClientIdAndContactIdToTelephones1597258506928
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'telephones',
      new TableColumn({
        name: 'client_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'telephones',
      new TableForeignKey({
        name: 'TelephoneClient',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      'telephones',
      new TableColumn({
        name: 'contact_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'telephones',
      new TableForeignKey({
        name: 'TelephoneContact',
        columnNames: ['contact_id'],
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
    await queryRunner.dropColumn('telephones', 'contact_id');
    await queryRunner.dropColumn('telephones', 'client_id');
  }
}
