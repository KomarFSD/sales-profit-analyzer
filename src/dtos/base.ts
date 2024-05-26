import {Request} from "express";

export interface BaseTradeProductDto {
    product_id: string,
    price: number,
    quantity: number,
}
export interface BaseTradeDto<T> {
    products: T[],
    date: Date
}
export interface BaseTradeDtoRequest<T> extends Request {
    body: T
}