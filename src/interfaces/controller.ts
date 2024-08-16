import { FastifyInstance } from "fastify";

export interface Controller {
    path: string;
    registerRoutes: (fastify: FastifyInstance, prefix: string) => void
}