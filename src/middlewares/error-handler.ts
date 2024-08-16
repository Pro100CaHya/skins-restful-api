import { FastifyReply, FastifyRequest } from "fastify";
import { HttpError } from "src/exceptions";

export function errorHandler(error: HttpError, request: FastifyRequest, reply: FastifyReply) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong";

    reply
        .status(statusCode)
        .send({
            statusCode,
            message
        });
}