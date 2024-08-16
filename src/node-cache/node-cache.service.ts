import NodeCache from "node-cache";

export class NodeCacheService {
    cache: NodeCache;
    
    constructor(stdTTL: number) {
        this.cache = new NodeCache({
            stdTTL
        });
    }

    public setCache<T>(key: string, value: T) {
        this.cache.set(key, value);
    }

    public getCache<T>(key: string): T {
        return this.cache.get(key);
    }
}