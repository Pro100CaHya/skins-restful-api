import { Controller } from "src/interfaces";
import { ItemService } from "./item.service";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export class ItemController implements Controller {
    public path = "/items";

    constructor(
        private itemService: ItemService
    ) {}

    public registerRoutes(fastify: FastifyInstance, prefix: string = "/api") {
        fastify.get(`${prefix}${this.path}`, this.getItems);
    }

    private getItems = async (request: FastifyRequest, reply: FastifyReply ) => {
        try {
            const items = await this.itemService.getItems();

            reply.status(200).send(items);
        } catch (error) {
            reply.send(error);
        }
    }
}