import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: String,
  taskID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Comment", commentSchema);
