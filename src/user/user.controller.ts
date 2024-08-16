import { Controller } from "src/interfaces";
import { UserService } from "./user.service";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { requestValidator } from "src/middlewares";
import { writeOffBalanceBodySchema, writeOffBalanceParamsSchema } from "./schemas";

interface writeOffBalanceParams {
    id: string
}

interface writeOffBalanceBody {
    amount: number
}

export class UserController implements Controller {
    public path = "/users";

    constructor(
        private userService: UserService
    ) {}

    public registerRoutes(fastify: FastifyInstance, prefix: string = "/api") {
        fastify.post(`${prefix}${this.path}/:id`, {
            preHandler: [
                requestValidator(writeOffBalanceBodySchema),
                requestValidator(writeOffBalanceParamsSchema, "params")
            ]
        }, this.writeOffBalance);
    }

    private writeOffBalance = async (request: FastifyRequest<{ Params: writeOffBalanceParams, Body: writeOffBalanceBody}>, reply: FastifyReply ) => {
        try {
            const { id } = request.params;
            const { amount } = request.body;

            const writeOffBalanceResult = await this.userService.writeOffBalance(Number(id), amount);

            reply.status(200).send(writeOffBalanceResult);
        } catch (error) {
            reply.send(error);
        }
    }
}