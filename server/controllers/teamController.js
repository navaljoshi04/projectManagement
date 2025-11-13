import Team from "../models/Team.js";

export const createTeam = async (req, res) => {
  try {
    const { teamName, productOwnerUserID, productManagerUserID } = req.body;
    const newTeam = await Team.create({
      teamName,
      productManagerUserID,
      productOwnerUserID,
    });
    await newTeam.save();
    return res
      .status(201)
      .json({ message: "team created successfully ..", newTeam });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while creating the project: " + error.message });
  }
};
