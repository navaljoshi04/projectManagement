import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  productOwnerUserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productManagerUserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Team", teamSchema);
