import { HttpError } from "src/exceptions";

export class UserWithIdNotFound extends HttpError {
    constructor(id: number) {
        super(`User with id ${id} not found`, 400);
    }
}