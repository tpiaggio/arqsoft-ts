import {Filter, Options, Product} from "../types";

export interface SearchOptions {
  field: keyof Product;
  value: string | number;
}

export const searchFilter: Filter = function (
  data: Product[],
  {search}: {search?: SearchOptions}
): Product[] {
  if (!search) {
    return data;
  }
  const {field, value} = search;
  return data.filter((item) => item[field] === value);
};
