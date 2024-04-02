import express from "express";
import dotenv from "dotenv";
import Pipeline from "./Pipeline";
import {revert, upperCase, trim, fullStop, length} from "./filters";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/transform", function (req, res) {
  const data: string = req.query.data?.toString() || "";

  var pipeline = new Pipeline();
  pipeline.use(revert);
  pipeline.use(upperCase);
  pipeline.use(trim);
  pipeline.use(length);
  pipeline.use(fullStop);

  const result = pipeline.run(data);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
