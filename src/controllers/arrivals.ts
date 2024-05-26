import { Response } from 'express';
import {ArrivalDtoRequest} from "../dtos";
import {arrivalsService, productsService} from "../services";

export const arrivalsController = new class ArrivalController {
    async arrival (req: ArrivalDtoRequest, res: Response) {
        await productsService.checkArrivalOrOrderWithThrow(req.body.products.map(({ product_id }) => product_id));
        const arrival = await arrivalsService.arrival(req.body);
        res.status(201).json(arrival);
    }
}