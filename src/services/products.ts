import { Product } from "../models";
import { ProductsDto } from "../dtos";
import { Op } from "sequelize";
import {BadRequest, Conflict} from "http-errors";

export const productsService = new class ProductsService {
    async createMany(data: ProductsDto[]): Promise<Product[]> {
        return await Product.bulkCreate(data)
    }

    async findManyByIds(ids: string[]): Promise<Product[]> {
        return await Product.findAll({ where: { id: { [Op.in]: ids }}});
    }

    async checkArrivalOrOrderWithThrow(ids: string[]): Promise<void> {
        const productsIds = new Set(ids)
        if (productsIds.size !== ids.length) {
            throw new BadRequest('Has duplicate product ids')
        }
        const products = await productsService.findManyByIds([...productsIds]);
        if(products.length !== productsIds.size) {
            const existIds = products.map(({id}) => id )
            const notExistProductIds = [...productsIds].filter(id => !existIds.includes(id))
            throw new Conflict(`Product with ids:${notExistProductIds} not exist`)
        }
    }
}