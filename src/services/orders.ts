import {Order, OrderProduct, sequelize} from '../models'
import { QueryTypes } from 'sequelize'
import {OrderDto, Report} from "../dtos";
import {costsService} from "./costs";

export const ordersService = new class OrdersService {
    async sale(data: OrderDto): Promise<Order> {
        const order = await Order.create(data, {include: [OrderProduct] });
        costsService.onChangeCost(order, costsService.type.ORDER).catch(console.error).finally(() => console.log('done'));
        return order;
    }

    async report(startDate: Date, endDate: Date): Promise<Report[]> {
        const report: Report[] =
            await sequelize.query(`
            SELECT
                DATE(o.date) AS date,
                SUM(op.price * op.quantity) AS summ,
                SUM(c.value * op.quantity) AS cost,
                SUM((op.price - c.value) * op.quantity) AS profit,
                (SUM((op.price - c.value) * op.quantity) / SUM(c.value * op.quantity)) * 100 AS profitability
            FROM
                "Orders" o
                JOIN
                "OrderProducts" op ON o.id = op.order_id
                JOIN
                "Costs" c ON op.product_id = c.product_id
            WHERE
                EXTRACT(YEAR FROM o.date) = EXTRACT(YEAR FROM c.date)
              AND EXTRACT(MONTH FROM o.date) = EXTRACT(MONTH FROM c.date)
              AND o.date BETWEEN :startDate AND :endDate
            GROUP BY
                DATE(o.date)
            ORDER BY
                DATE(o.date);
        `, {
            type: QueryTypes.SELECT,
            replacements: { startDate, endDate }
        });

        const summary = report.reduce((acc, row) => {
            acc.summ += row.summ;
            acc.cost += row.cost;
            acc.profit += row.profit;
            return acc;
        }, { date: null, summ: 0, cost: 0, profit: 0, profitability: 0 });

        summary.profitability = (summary.profit / summary.cost) * 100;

        report.push(summary);
        return report;
    }
};
