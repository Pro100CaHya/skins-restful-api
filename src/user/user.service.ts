import { UserHaveNotEnoughMoney, UserWithIdNotFound } from "./exceptions";
import { UserRepository } from "./user.repository";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    public async writeOffBalance(userId: number, amount: number) {
        const userBalance = await this.userRepository.getUserBalance(userId);

        if (userBalance === null) {
            throw new UserWithIdNotFound(userId);
        }

        if (amount > userBalance) {
            throw new UserHaveNotEnoughMoney(userId);
        }

        const writeOffBalanceResult = await this.userRepository.writeOffBalance(userId, amount);

        return writeOffBalanceResult;
    }
}