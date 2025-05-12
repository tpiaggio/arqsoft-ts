import express from "express";
import dotenv from "dotenv";
import sequelize from "./db";

import userRoutes from "./routes/user";
import taskRoutes from "./routes/task";

dotenv.config();

const app = express();
app.use(express.json());
const port = 4000;

app.use(userRoutes);
app.use(taskRoutes);

async function testConnection() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.listen(port, () => {
  console.log(`Example publisher listening on port ${port}`);
});

testConnection();