import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    AutoIncrement,
    Default
} from 'sequelize-typescript';
import { Arrival } from './Arrival';
import { Product } from './Product';

@Table({
    timestamps: false,
    paranoid: true,
    indexes: [
        {
            unique: false,
            fields: ['product_id']
        }
    ]
})
export class ArrivalProduct extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    id!: string;

    @ForeignKey(() => Arrival)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    arrival_id!: string;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    product_id!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    quantity!: number;

    @BelongsTo(() => Arrival)
    arrival!: Arrival;

    @BelongsTo(() => Product)
    product!: Product;
}
