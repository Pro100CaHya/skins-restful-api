import { config } from "dotenv";

import { ItemService, ItemController } from "./item";
import { NodeCacheService } from "./node-cache";
import { Server } from "./server";
import { PostgresService } from "./postgres";
import { UserRepository, UserService, UserController } from "./user";

const main = () => {
    config();

    const {
        POSTGRES_USER,
        POSTGRES_DB,
        POSTGRES_PASSWORD,
        POSTGRES_PORT,
        POSTGRES_HOST,
        CACHE_TTL,
        PORT
    } = process.env;
    
    const nodeCacheService = new NodeCacheService(Number(CACHE_TTL));
    const itemService = new ItemService(nodeCacheService);
    const itemController = new ItemController(itemService);

    const postgresService = new PostgresService(
        POSTGRES_USER,
        POSTGRES_HOST,
        POSTGRES_DB,
        POSTGRES_PASSWORD,
        parseInt(POSTGRES_PORT)
    );
    const userRepository = new UserRepository(postgresService);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    const server = new Server([
        itemController,
        userController
    ], Number(PORT));

    server.startServer();
}

main();