import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DATABASE_NAME,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
