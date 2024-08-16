import Joi from "joi";

export const writeOffBalanceParamsSchema = Joi.object({
    id: Joi.string().regex(/^[1-9]\d*$/).required(),
});
