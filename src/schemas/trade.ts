import Joi from 'joi';

const tradeProduct = Joi.object({
    product_id: Joi.string().min(1).max(40).required(),
    price: Joi.number().greater(0),
    quantity: Joi.number().greater(0),
})

export const trade = Joi.object({
    date: Joi.date(),
    products: Joi.array().items(tradeProduct).min(1).required(),
});