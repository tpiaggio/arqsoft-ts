import mongoose, {Schema, model} from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  followers: mongoose.Types.ObjectId[];
  blocked: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<User>({
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  followers: [{type: mongoose.Types.ObjectId, ref: "User"}],
  blocked: [{type: mongoose.Types.ObjectId, ref: "User"}],
});

export default model<User>("User", userSchema);
