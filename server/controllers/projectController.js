import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res
      .status(200)
      .json({ message: "successfully fetched the projects", projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving the projects:" + error.message });
  }
};

export const createProject = async (req, res) => {
  const { name, description, startDate, endDate } = req.body;
  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }
  try {
    const newProject = await Project.create({
      name,
      description,
      startDate,
      endDate,
    });
    await newProject.save();
    res.status(201).json({
      message: "successfully created the project",
      project: newProject,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while creating the project: " + error.message });
  }
};
