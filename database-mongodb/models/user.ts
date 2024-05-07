import {Schema, model} from "mongoose";

interface User {
  name: string;
  email: string;
}

const userSchema = new Schema<User>({
  name: {type: String, required: true},
  email: {type: String, required: true},
});

export default model<User>("User", userSchema);
