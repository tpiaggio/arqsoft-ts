import mongoose, {model, Schema} from "mongoose";

interface Task {
  userId: mongoose.Types.ObjectId;
  title: string;
  completed: boolean;
}

const taskSchema = new Schema({
  userId: {type: mongoose.Types.ObjectId, ref: "User", required: true},
  title: {type: String, required: true},
  completed: {type: Boolean, default: false},
});

export default model<Task>("Task", taskSchema);
