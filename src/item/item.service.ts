import { NodeCacheService } from "src/node-cache";
import { Item } from "./item.interface";
import { RateLimitExceeded } from "./exceptions";
import { HttpError } from "src/exceptions";

export class ItemService {
    constructor(private nodeCacheService: NodeCacheService) { }

    public async getItems() {
        const cachedItems = this.nodeCacheService.getCache<Item[]>("items");

        if (cachedItems) {
            return cachedItems;
        }

        const [itemsWithDefaultPrices, itemsWithTradablePrices] = await Promise.all([
            fetch(`${process.env.SKINPORT_API_URL}`)
                .then((data) => data.json()),
            fetch(`${process.env.SKINPORT_API_URL}?tradable=1`)
                .then((data) => data.json()),
        ]);

        if (itemsWithDefaultPrices?.errors || itemsWithTradablePrices?.errors) {
            if (itemsWithDefaultPrices?.errors?.[0]?.id === "rate_limit_exceeded") {
                throw new RateLimitExceeded();
            }

            else {
                throw new HttpError();
            }
        }

        const tradablePrices = new Map(
            itemsWithTradablePrices.map((item: Item) => [item.market_hash_name, item.min_price])
        );

        const items = itemsWithDefaultPrices.map((item: Item) => ({
            ...item,
            min_tradable_price: tradablePrices.get(item.market_hash_name),
            min_non_tradable_price: item.min_price
        }));

        this.nodeCacheService.setCache<Item[]>("items", items);

        return items;
    }
}