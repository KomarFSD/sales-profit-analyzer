import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    Default
} from 'sequelize-typescript';
import { Order } from './Order';
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
export class OrderProduct extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    id!: string;

    @ForeignKey(() => Order)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    order_id!: string;

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

    @BelongsTo(() => Order)
    order!: Order;

    @BelongsTo(() => Product)
    product!: Product;
}
