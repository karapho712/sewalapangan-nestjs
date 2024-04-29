import { dataSourceOptions } from './data-source';

module.exports = {
  ...dataSourceOptions,
  seeds: ['dist/seeds/**/*.seed{.ts,.js}'],
  factories: ['dist/factories/**/*.factory{.ts,.js}'],
};
