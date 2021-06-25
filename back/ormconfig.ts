import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DBHOST,
  port: 5432,
  username: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  migrationsTableName: "migrations",
  entities: [
    'src/entity/**/*.ts',
  ],
  migrations: [
    'src/migration/**/*.ts',
  ],
  synchronize: false,
  logging: false,
  cli: {
    migrationsDir: 'src/migration/**/*.ts',
  }
};

export = config;
