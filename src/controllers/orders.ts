import { Response, Request } from 'express';
import { BadRequest } from 'http-errors'
import { OrderDtoRequest} from "../dtos";
import {ordersService, productsService} from "../services";

export const ordersController = new class OrdersController {
    async sale (req: OrderDtoRequest, res: Response) {
        await productsService.checkArrivalOrOrderWithThrow(req.body.products.map(({ product_id}) => product_id))
        const order = await ordersService.sale(req.body);
        res.status(201).json(order);
    }

    async report ({query: { startDate, endDate }}: Request, res: Response) {
        if (!startDate || !endDate) throw new BadRequest('startDate and endDate is required');
        const start = new Date(startDate as string);
        const end = new Date(endDate as string);
        if(isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new BadRequest('startDate and endDate must be type of date')
        }
        const report = await ordersService.report(start, end)
        res.send(report);
    }
}