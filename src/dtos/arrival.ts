import {CreationAttributes} from "sequelize";
import {Arrival, ArrivalProduct} from "../models";
import {BaseTradeProductDto, BaseTradeDtoRequest, BaseTradeDto} from "./base";

export interface ArrivalProductDto extends BaseTradeProductDto,CreationAttributes<ArrivalProduct> {}
export interface ArrivalDto extends BaseTradeDto<ArrivalProductDto>,CreationAttributes<Arrival> {}
export interface ArrivalDtoRequest extends BaseTradeDtoRequest<ArrivalDto> {}