import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  cognitoID: String,
  username: {
    type: String,
    required: true,
    trim: true,
  },
  profilePictureUrl: String,
  teamID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
