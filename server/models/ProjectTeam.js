import mongoose from "mongoose";

const projectTeamSchema = new mongoose.Schema({
  teamID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  projectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

export default mongoose.model("ProjectTeam", projectTeamSchema);
