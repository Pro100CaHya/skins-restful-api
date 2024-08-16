import { HttpError } from "src/exceptions";

export class UserHaveNotEnoughMoney extends HttpError {
    constructor(id: number) {
        super(`User with id ${id} have not enough money`, 400);
    }
}