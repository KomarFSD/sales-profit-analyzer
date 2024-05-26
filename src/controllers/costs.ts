import { Response, Request} from 'express';
import { BadRequest, NotFound } from "http-errors";
import {costsService} from "../services";

export const costsController = new class CostsController {
    async getCosts ({ params: { product_id}, query: { date }}: Request, res: Response) {
        if (!product_id) throw new BadRequest("Params product_id is required")
        let formattedDate;
        if (date) {
            formattedDate = new Date(date as string);
            if(isNaN(formattedDate.getTime())) throw new BadRequest("Date must be type of date")
        } else {
            formattedDate = new Date();
        }
        const cost = await costsService.getCost(product_id, formattedDate)
        if (!cost) throw new NotFound("Not found Cost")
        res.json(cost);
    }
}