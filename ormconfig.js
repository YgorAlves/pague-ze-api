require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
  // type: 'mysql',
  // host: 'localhost',
  // port: 3308,
  // username: 'root',
  // password: 'consys',
  // database: 'pagueze',
  type: 'postgres',
  host: 'ec2-34-200-106-49.compute-1.amazonaws.com',
  port: 5432,
  username: 'bqdtchprxxaqog',
  password: 'd119e60f6a506daabb779ef20ff1c8d9dee06e2c8613a3c2ffe0e8a898405323',
  database: 'd2524gct5o11f1',
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