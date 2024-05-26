import {CreationAttributes} from "sequelize";
import { OrderProduct, Order } from "../models";
import {BaseTradeDto, BaseTradeProductDto, BaseTradeDtoRequest} from "./base";

export interface OrderProductDto extends BaseTradeProductDto,CreationAttributes<OrderProduct> {}
export interface OrderDto extends BaseTradeDto<OrderProductDto>, CreationAttributes<Order> {}
export interface OrderDtoRequest extends BaseTradeDtoRequest<OrderDto> {}
export interface Report {
    date: Date|null,
    summ: number,
    cost: number,
    profit: number,
    profitability: number
}