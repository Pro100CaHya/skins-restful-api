import { QueryResult } from "pg";
import { PostgresService } from "src/postgres";
import { User } from "./user.interface";

export class UserRepository {
    constructor(private postgresService: PostgresService) {}

    public async getUserBalance(userId: number): Promise<number> {
        const queryResult: QueryResult = await this.postgresService.query(
            `
                SELECT balance
                FROM users
                WHERE id = $1;
            `,
            [
                userId
            ]
        );

        if (queryResult.rowCount === 0) {
            return null;
        }

        return Number(queryResult.rows[0].balance);
    }

    public async writeOffBalance(userId: number, writtenBalance: number): Promise<User> {
        const queryResult: QueryResult = await this.postgresService.query(
            `
                UPDATE users
                SET balance = balance - $1
                WHERE id = $2
                RETURNING id, balance;
            `,
            [
                writtenBalance,
                userId
            ]
        );

        if (queryResult.rowCount === 0) {
            return null;
        }

        return {
            id: queryResult.rows[0].id,
            balance: queryResult.rows[0].balance
        };
    }
}