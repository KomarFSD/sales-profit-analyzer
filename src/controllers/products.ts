import {Response, Request} from "express"
import { Conflict } from 'http-errors'
import { productsService} from "../services";
import {ProductsDtoRequest} from "../dtos";

export const productsController = new class ProductsController {
    async create(req: ProductsDtoRequest, res: Response) {
        const exists = await productsService.findManyByIds(req.body.map(({id})=> id));
        if(exists.length) {
            throw new Conflict(`Product with ids:${exists.map(({id}) => id)} already exist`)
        }
        const products = await productsService.createMany(req.body)
        res.status(201).json(products);
    }
}