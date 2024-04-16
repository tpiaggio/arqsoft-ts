import {Product} from "../types";

export interface RangeOptions {
  field: keyof Product;
  min: number;
  max: number;
}

export function rangeFilter(
  data: Product[],
  {range}: {range?: RangeOptions}
): Product[] {
  if (!range) {
    return data;
  }
  const {min, max, field} = range;
  return data.filter((item) => item["price"] >= min && item["price"] <= max);
}
