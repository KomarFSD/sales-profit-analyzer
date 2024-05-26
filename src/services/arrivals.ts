import { Arrival, ArrivalProduct } from '../models'
import {ArrivalDto} from "../dtos";
import {Op} from "sequelize";
import {costsService} from "./costs";

export const arrivalsService = new class ArrivalsService {
    async arrival(data: ArrivalDto): Promise<Arrival> {
        const arrival = await Arrival.create(data, {include: [ArrivalProduct] });
        costsService.onChangeCost(arrival, costsService.type.ARRIVAL).catch(console.error).finally(() => console.log('done'));
        return arrival;
    }

    async getByMonthAndProductId(date: Date, product_id: string): Promise<ArrivalProduct[]> {
        const lteDate = new Date(date)
        lteDate.setMonth(date.getMonth() + 1)
        return await ArrivalProduct.findAll({
            where: { product_id },
            include: [{
                model: Arrival,
                where: {
                    date: {
                        [Op.gte]: date,
                        [Op.lte]: lteDate
                    }
                }
            }]
        });
    }
};
