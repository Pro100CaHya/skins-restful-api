import { HttpError } from "src/exceptions";

export class RateLimitExceeded extends HttpError {
    constructor() {
        super("External Api (Skinport) Rate Limit Exceeded", 429);
    }
}