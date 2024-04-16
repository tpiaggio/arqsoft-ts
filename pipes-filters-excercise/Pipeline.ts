import {Filter, Product, Options} from "./types";

class Pipeline {
  filters: Filter[];

  constructor() {
    // Initialize attributes
    this.filters = [];
  }
  use(filter: Filter) {
    // Add a filter to the execution flow
    this.filters.push(filter);
  }
  run(products: Product[], options: Options): Product[] {
    /* Execute the first filter and then pass the modified input
      to the next filter
      */
    const result = this.filters.reduce(function (total, func) {
      return func(total, options);
    }, products);

    return result;
  }
}

export default Pipeline;
