import {CreationAttributes} from "sequelize";
import { Request } from 'express'
import {Product} from "../models";

export interface ProductsDto extends CreationAttributes<Product>{
    id: string
    name: string
}
export interface ProductsDtoRequest extends Request {
    body: ProductsDto[];
}