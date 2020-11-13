require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3308,
  username: 'root',
  password: 'consys',
  database: 'pagueze',
  logging: true,
  synchronize: true,
  ssl: false,
  logger: "advanced-console",
  entities: ['./dist/models/**.entity{.ts,.js}'],
  migrations: ['./dist/migrations/**/*.ts'],
  subscribers: ['./dist/loaders/**/*.ts'],
  cli: {
    entitiesDir: './models',
    migrationsDir: './migrations',
    subscribersDir: './loaders',
  },

};