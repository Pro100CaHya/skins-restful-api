import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { Schema } from 'joi';

export const requestValidator = (schema: Schema, type: "body" | "params" = "body") => {
    return (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
        let validationCandidate;

        if (type === "body") {
            validationCandidate = req.body;
        } else if (type === "params") {
            validationCandidate = req.params;
        }

        const { error } = schema.validate(validationCandidate);

        if (error) {
            reply.status(400).send({ error: error.details[0].message });
        } else {
            done();
        }
    };
};