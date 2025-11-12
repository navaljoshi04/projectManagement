import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  priority: {
    type: String,
  },
  tags: {
    type: String,
  },
  startDate: Date,
  dueDate: Date,
  points: Number,
  projectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  authorUserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assignedUserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.Schema("Task", taskSchema);
