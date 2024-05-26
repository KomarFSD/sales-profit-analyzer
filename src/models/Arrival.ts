import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    PrimaryKey,
    AutoIncrement,
    Default,
    Sequelize
} from 'sequelize-typescript';
import { ArrivalProduct } from './ArrivalProduct';

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
export class Arrival extends Model {
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    })
    date!: Date;

    @HasMany(() => ArrivalProduct)
    products!: ArrivalProduct[];
}
