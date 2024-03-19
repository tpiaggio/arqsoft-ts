import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

interface User {
  id: number;
  name: string;
  email: string;
}

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/users/:id", (req, res) => {
  const userId: number = parseInt(req.params.id);
  const user: User = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
  };
  res.json(user);
});

app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

app.post("/users", (req, res) => {
  const {name, email}: {name: string; email: string} = req.body;

  if (!name || !email) {
    res.send({error: "You must provide a name and an email"});
  }

  const newUser: User = {
    id: Math.floor(Math.random() * 1000),
    name,
    email,
  };
  res.status(201).json(newUser);
});

app.get("/weather", (req, res) => {
  const address: string = req.query.address as string;
  if (!address) {
    res.send({error: "You must provide an address"});
  }
  const weatherstackApiKey = process.env.WEATHERSTACK_API_KEY;
  if (!weatherstackApiKey) {
    res.send({error: "Weatherstack API key is not provided"});
  }
  axios
    .get(
      `http://api.weatherstack.com/current?access_key=${weatherstackApiKey}&query=${address}`
    )
    .then(function (response) {
      if (response.data.error) {
        res.send(`Unable to retrieve weather data from address ${address}`);
        return;
      }
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.send("Unabe to retrieve weather data from the API");
      return;
    });
});

app.put("/users", (req, res) => {
  res.send("Got a PUT request at /user");
});

app.delete("/users", (req, res) => {
  res.send("Got a DELETE request at /user");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
