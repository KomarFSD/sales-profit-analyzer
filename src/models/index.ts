import { Sequelize } from 'sequelize-typescript';
import { Product } from './Product';
import { Arrival } from './Arrival';
import { ArrivalProduct } from './ArrivalProduct';
import { Order } from './Order';
import { OrderProduct } from './OrderProduct';
import { Cost } from './Cost';
import { dbConfig } from "../config"

const sequelize = new Sequelize({
    ...dbConfig,
    models: [Product, Arrival, ArrivalProduct, Order, OrderProduct, Cost],
});

export { sequelize, Product, Arrival, ArrivalProduct, Order, OrderProduct, Cost };
