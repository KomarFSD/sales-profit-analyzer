import {Op} from 'sequelize'
import {Arrival, ArrivalProduct, Cost, Order, OrderProduct} from "../models";
import {arrivalsService} from "./arrivals";

enum ChangeType {
    ARRIVAL = "ARRIVAL",
    ORDER = "ORDER"
}

export const costsService = new class CostsService {
    type = ChangeType;

    async onChangeCost(trade: Arrival | Order, type: ChangeType): Promise<void> {
        switch (type) {
            case ChangeType.ARRIVAL:
                await this.arrivalUpdate(trade as Arrival);
                break;
            case ChangeType.ORDER:
                await this.orderUpdate(trade as Order);
                break;
            default: break;
        }
    }

    async getCost(product_id: string, date: Date): Promise<Cost | null> {
        const changedDate = this.setDateOnCostType(date);
        return await this.findCost(changedDate, product_id);
    }

    private async arrivalUpdate(arrival: Arrival ): Promise<void> {
        const date = this.setDateOnCostType(arrival.date);
        for (const product of arrival.products) {
            await this.calculateCost(product, date);
        }
    }

    private async orderUpdate(order: Order): Promise<void> {
        const date = this.setDateOnCostType(order.date)
        for (const product of order.products) {
            await this.updateQuantity(product, date)
        }
    }

    private async calculateCost(product: ArrivalProduct, date: Date): Promise<void> {
        const { product_id } = product;

        const arrivalByThisMonth = await arrivalsService.getByMonthAndProductId(date, product_id);
        const { tradeSum, tradeQuantity } = this.getSumAndQuantityFromTradeProduct(arrivalByThisMonth)

        const previousCost = await this.findPreviousCost(date, product_id);
        let previousSum = 0, previousQuantity = 0;
        if (previousCost) {
            previousSum = previousCost.value * previousCost.quantity;
            previousQuantity = previousCost.quantity;
        }
        const value = (previousSum + tradeSum) / (previousQuantity + tradeQuantity)

        const cost = await this.findCost(date, product_id);
        if (cost) {
            const quantity = cost.quantity + product.quantity;
            await Cost.update({ value, quantity }, { where: { id: cost.id }});
        } else {
            const quantity = previousQuantity + product.quantity;
            await Cost.create({value, quantity, date, product_id});
        }

        await this.updateCostHistory(date, product)
    }

    private async updateQuantity(product: OrderProduct, date: Date) {
        const {product_id} = product;
        const cost = await this.findCost(date, product_id);
        if (cost) {
            const quantity = cost.quantity - product.quantity;
            await Cost.update({ quantity }, { where: { id: cost.id}})
        } else {
            const previousCost = await this.findPreviousCost(date, product_id);
            let quantity = 0, value = 0;
            if (previousCost) {
                quantity = previousCost.quantity - product.quantity;
                value = previousCost.value
            }
            await Cost.create({ quantity, value, date, product_id });
        }

        const arrivalProduct: ArrivalProduct = { product_id, quantity: -product.quantity } as ArrivalProduct;
        await this.updateCostHistory(date, arrivalProduct);
    }

    private async updateCostHistory(date: Date, product: ArrivalProduct) {
        if (!this.isSameYearAndMonthWithNow(date)) {
            const nextDate = new Date(date)
            nextDate.setMonth(date.getMonth() + 1);
            await this.calculateCost(product, nextDate);
        }
    }

    private async findCost(date: Date, product_id: string): Promise<Cost | null> {
        return await Cost.findOne({ where: { date , product_id }});
    }

    private async findPreviousCost(date: Date, product_id: string): Promise<Cost | null> {
        return await Cost.findOne({ where: {
                product_id,
                date: {
                    [Op.lt]: date,
                }
            },
            order: [['date', 'DESC']],});
    }

    private setDateOnCostType(date: Date):Date {
        const newDate = new Date(date);
        newDate.setDate(1);
        newDate.setHours(0, 0, 0, 0);
        return newDate;
    }

    private getSumAndQuantityFromTradeProduct(products: ArrivalProduct[]|OrderProduct[]): {tradeSum: number,tradeQuantity: number } {
        return products.reduce(
            (acc, a) => {
                acc.tradeQuantity+=a.quantity;
                acc.tradeSum+=a.quantity*a.price;
                return acc;
            }, { tradeSum: 0, tradeQuantity: 0});
    }

    private isSameYearAndMonthWithNow (date: Date): boolean {
        const currentDate = new Date()
        return currentDate.getFullYear() === date.getFullYear() && currentDate.getMonth() === date.getMonth();
    };
};