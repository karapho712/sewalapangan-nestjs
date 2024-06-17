import { dataSourceOptions } from './data-source';

module.exports = {
  ...dataSourceOptions,
  seeds: ['dist/modules/**/*.seed{.ts,.js}'],
  factories: ['dist/modules/**/*.factory{.ts,.js}'],
};
