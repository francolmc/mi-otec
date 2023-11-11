import { DataSource } from "typeorm";
import { User } from "../infraestructure/adapters/entities";
import { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } from "$env/static/private";

export default class TypeOrm {
    private static instance: Promise<DataSource | null> | null = null;

    public static getDb(): Promise<DataSource | null> {
        if (!TypeOrm.instance) {
            TypeOrm.instance = new DataSource({
                type: 'postgres',
                host: DATABASE_HOST,
                port: +(DATABASE_PORT || 0),
                username: DATABASE_USER, // make these .env
                password: DATABASE_PASSWORD,
                database: DATABASE_NAME,
                synchronize: true,
                entities: [User],
                logging: true,
            }).initialize()
                .then((fulfilled) => {
                    console.info('Data Source has been initialized!');
                    return fulfilled;
                })
                .catch((err) => {
                    console.error('Error during Data Source initialization', err);
                    return null;
                });
        }
        return TypeOrm.instance;
    }
}