import express from "express";
import dotenv from "dotenv";
import {createClient} from "redis";
import {Message} from "./types";

dotenv.config();

const app = express();
app.use(express.json());
const port = 3000;
const client = createClient();

app.post("/publish", async function (req, res) {
  const message: Message = req.body;
  try {
    await client.connect();
    await client.publish(message.topic, JSON.stringify(message));
  } catch (error) {
    console.log(error);
  } finally {
    await client.disconnect();
  }
  res.send("Publishing an Event using Redis");
});

app.listen(port, () => {
  console.log(`Example publisher listening on port ${port}`);
});
