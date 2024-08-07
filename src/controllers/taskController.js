const Task = require("../models/task");

const selectAttributes = ["_id", "title", "description", "completed"];

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { _id } = req.user;

    if (!_id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description both are required",
      });
    }

    const data = {
      title: title.trim().toUpperCase(),
      description: description.trim(),
      userId: _id,
    };

    const task = new Task(data);
    await task.save();

    const newTask = await Task.findById(task._id).select(selectAttributes);

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!_id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const tasks = await Task.find({
      userId: _id,
    }).select(selectAttributes);

    const taskCount = await Task.countDocuments({ userId: _id });
    res.status(200).json({ success: true, count: taskCount, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).select(selectAttributes);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }

    if (!title || !description || !completed === Boolean) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const data = {
      title: title.toUpperCase(),
      description: description.trim(),
      completed,
    };

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { ...data },
      { new: true, runValidators: true }
    ).select(selectAttributes.join(" "));

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
