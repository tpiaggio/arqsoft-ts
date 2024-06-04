import {Request, Response} from "express";
import {createClient} from "redis";
import Post from "../models/post";
import User from "../models/user";

const redisClient = createClient();

export const createPost = async (req: Request, res: Response) => {
  const {content} = req.body;
  try {
    const post = await Post.create({author: req.params.userId, content});
    const user = await User.findById(req.params.userId);
    if (user && user.followers.length > 0) {
      await redisClient.connect();
      user.followers.forEach((follower) => {
        if (!user.blocked.includes(follower)) {
          redisClient.publish(follower.toString(), JSON.stringify(post));
        }
      });
    }
    res.status(201).send(post);
  } catch (error) {
    res.status(500).json({error});
  }
};

export const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({author: req.params.id}).sort({
      timestamp: -1,
    });
    const formattedPosts = posts.map((post) => ({
      content: post.content,
      timestamp: post.timestamp,
      likesCount: post.likes.length,
      dislikesCount: post.dislikes.length,
    }));
    res.status(200).send(formattedPosts);
  } catch (error) {
    res.status(500).json({error});
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    const post = await Post.findById(req.params.id);
    if (
      post &&
      !post.likes.includes(user!._id) &&
      !post.dislikes.includes(user!._id)
    ) {
      post.likes.push(user!._id);
      await post.save();
      res.status(200).send("Post liked");
    } else {
      res.status(400).send("User has already reacted to this post");
    }
  } catch (err) {
    res.status(500).send("There was a problem liking the user");
  }
};

export const dislikePost = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    const post = await Post.findById(req.params.id);
    if (
      post &&
      !post.likes.includes(user!._id) &&
      !post.dislikes.includes(user!._id)
    ) {
      post.dislikes.push(user!._id);
      await post.save();
      res.status(200).send("Post disliked");
    } else {
      res.status(400).send("User has already reacted to this post");
    }
  } catch (err) {
    res.status(500).send("There was a problem disliking the user");
  }
};
