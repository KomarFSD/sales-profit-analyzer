import {Table, Column, Model, DataType, PrimaryKey, Default} from 'sequelize-typescript';

@Table
export class Product extends Model {
    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;
}
