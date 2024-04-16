import express from "express";
import dotenv from "dotenv";
import Pipeline from "./Pipeline";
import {Options, Product} from "./types";
import {rangeFilter} from "./filters/rangeFilter";
import {searchFilter} from "./filters/searchFilter";
import {sortFilter} from "./filters/sortFilter";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.post("/transform", function (req, res) {
  const {
    products,
    options,
  }: {
    products: Product[];
    options: Options;
  } = req.body;

  var pipeline = new Pipeline();
  pipeline.use(rangeFilter);
  pipeline.use(searchFilter);
  pipeline.use(sortFilter);

  const result = pipeline.run(products, options);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
