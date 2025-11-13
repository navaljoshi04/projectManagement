import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { username, profilePictureUrl, teamID } = req.body;

    const newUser = await User.create({
      username,
      profilePictureUrl,
      teamID,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ message: "user created successfully ..", newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while creating the project: " + error.message });
  }
};
