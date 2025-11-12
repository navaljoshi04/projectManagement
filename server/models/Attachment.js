import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
  fileURL: String,
  fileName: String,
  taskID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  uploadedByID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Attachment", attachmentSchema);
