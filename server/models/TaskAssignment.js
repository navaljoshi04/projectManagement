import mongoose from "mongoose";

const taskAssignmentSchema = new mongoose.model({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  taskID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
});

export default mongoose.model("TaskAssignment", taskAssignmentSchema);
