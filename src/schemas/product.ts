import Joi from 'joi';

const product = Joi.object({
    id: Joi.string().min(1).max(40).required(),
    name: Joi.string().min(1).max(40).required(),
});

export const arrayOfProducts = Joi.array().items(product).min(1);