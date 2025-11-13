import Task from "../models/Task.js";

export const getTask = async (req, res) => {
  const { projectID } = req.query;
  try {
    const task = await Task.find({ projectID: projectID })
      .populate("authorUserID")
      .populate("assignedUserID")

      .populate("attachments")
      .populate({
        path: "comments",
        populate: { path: "userID", model: "User" },
      });
    if (!task || task.length === 0) {
      return res
        .status(404)
        .json({ message: "No tasks found for this project" });
    }
    res.status(200).json({ message: "succesfully retrived the task", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error while fetching the task :" + error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      points,
      projectID,
      authorUserID,
      assignedUserID,
    } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      points,
      projectID,
      authorUserID,
      assignedUserID,
    });
    await newTask.save();
    res.status(201).json({
      message: "successfully created the project",
      task: newTask,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while creating the project: " + error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskID } = req.params;
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskID,
      { status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating task: " + error.message,
    });
  }
};
