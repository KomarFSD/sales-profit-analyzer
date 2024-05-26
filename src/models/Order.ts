import {Table, Column, Model, DataType, HasMany, PrimaryKey, AutoIncrement, Default} from 'sequelize-typescript';
import { OrderProduct } from './OrderProduct';

@Table({
    timestamps: false,
    paranoid: true,
    indexes: [
        {
            unique: false,
            fields: ['date']
        }
    ]
})
export class Order extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    id!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    date!: Date;

    @HasMany(() => OrderProduct)
    products!: OrderProduct[];
}
