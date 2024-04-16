import {RangeOptions} from "./filters/rangeFilter";
import {SearchOptions} from "./filters/searchFilter";
import {SortOptions} from "./filters/sortFilter";

export type Product = {
  name: string;
  category: string;
  price: number;
};

export type Options = {
  sort?: SortOptions;
  search?: SearchOptions;
  range?: RangeOptions;
};

export type Filter = {(products: Product[], options: Options): Product[]};
