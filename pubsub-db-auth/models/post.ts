import mongoose, {Schema, model} from "mongoose";

interface Post {
  author: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
}

const postSchema = new Schema<Post>({
  author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  content: {type: String, required: true},
  timestamp: {type: Date, default: Date.now},
  likes: [{type: mongoose.Types.ObjectId, ref: "User"}],
  dislikes: [{type: mongoose.Types.ObjectId, ref: "User"}],
});

export default model<Post>("Post", postSchema);
