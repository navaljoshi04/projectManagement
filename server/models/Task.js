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

taskSchema.virtual("attachments", {
  ref: "Attachment",
  localField: "_id",
  foreignField: "taskID",
});

taskSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "taskID",
});

taskSchema.set("toJSON", { virtuals: true });
taskSchema.set("toObject", { virtuals: true });

export default mongoose.model("Task", taskSchema);
