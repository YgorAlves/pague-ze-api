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
  entities: ['./dist/src/models/**.entity{.ts,.js}'],
  migrations: ['./dist/src/migrations/**/*.ts'],
  subscribers: ['./dist/src/loaders/**/*.ts'],
  cli: {
    entitiesDir: './src/models',
    migrationsDir: './src/migrations',
    subscribersDir: './src/loaders',
  },

};