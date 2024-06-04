import {createClient} from "redis";
import User from "./models/user";
import mongoose from "mongoose";

const redisClient = createClient();
const subscriber = redisClient.duplicate();

const MONGODB_URI = "mongodb://localhost:27017/arquitectura";
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const subscribeToUserPosts = async () => {
  try {
    const users = await User.find();
    users.forEach((user) => {
      subscriber.subscribe(user._id.toString(), (message) => {
        console.log(`New post for ${user.username}: `, message);
      });
      console.log(`Subscribed to user ${user.username}`);
    });
  } catch (error) {
    console.error("Error subscribing to user posts:", error);
  }
};

(async () => {
  await subscriber.connect();
  subscribeToUserPosts();
})();
