import { Client } from 'pg';
import { config } from 'dotenv';

config();

const initTableUsers = async () => {
    config();

    const {
        POSTGRES_USER,
        POSTGRES_DB,
        POSTGRES_PASSWORD,
        POSTGRES_PORT,
        POSTGRES_HOST,
    } = process.env;

    const client = new Client({
        host: POSTGRES_HOST,
        port: Number(POSTGRES_PORT),
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
    });

    try {
        await client.connect();
        await client.query(
            `
                BEGIN;

                    CREATE TABLE IF NOT EXISTS users (
                        id SERIAL PRIMARY KEY,
                        balance INTEGER NOT NULL CHECK (balance >= 0)
                    );

                    INSERT INTO users (balance)
                    VALUES (100);

                COMMIT;
            `
        );

        console.log('Users table created successfully');
    } catch (err) {
        console.error('Error creating users table', err);
    } finally {
        await client.end();
    }
}

initTableUsers();