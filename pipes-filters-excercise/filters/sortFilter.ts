import {Product} from "../types";

export interface SortOptions {
  field: keyof Product;
  order: "asc" | "desc";
}

export function sortFilter(
  data: Product[],
  {sort}: {sort?: SortOptions}
): Product[] {
  if (!sort) {
    return data;
  }
  const {field, order} = sort;
  return data.sort((a, b) => {
    if (order === "asc") {
      return a[field] > b[field] ? 1 : -1;
    } else {
      return a[field] < b[field] ? 1 : -1;
    }
  });
}
