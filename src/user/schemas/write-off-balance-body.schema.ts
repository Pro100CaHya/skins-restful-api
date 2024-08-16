import Joi from "joi";

export const writeOffBalanceBodySchema = Joi.object({
    amount: Joi.number().integer().positive().required(),
});