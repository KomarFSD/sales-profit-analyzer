import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    PrimaryKey,
    Default,
    BeforeSave
} from 'sequelize-typescript';
import { Product } from './Product';

@Table({
    timestamps: false,
    paranoid: true,
    indexes: [
        {
            unique: true,
            fields: ['date', 'product_id']
        }
    ]
})
export class Cost extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    id!: string;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    product_id!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    date!: Date;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    value!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    quantity!: number;
}
