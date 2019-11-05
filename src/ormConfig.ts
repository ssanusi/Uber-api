import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
    type : "postgres",
    database: "uber_db",
    synchronize: true,
    logging: true,
    entities: ["entities/**/*.*"],
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: 5432
}

export default connectionOptions;