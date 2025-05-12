import {Request, Response} from "express";
import Task from "../models/task";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({error});
  }
};

export const getTask = async (req: Request, res: Response) => {
  const taskId: string = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({message: "Task not found"});
    }
  } catch (error) {
    res.status(500).json({error});
  }
};

export const createTask = async (req: Request, res: Response) => {
  const {userId, title, completed} = req.body;
  try {
    const task = new Task({userId, title, completed});
    const response = await task.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({error});
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const taskId: string = req.params.id;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({message: "Task not found"});
    }
  } catch (error) {
    res.status(500).json({error});
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const taskId: string = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (deletedTask) {
      res.status(200).json(deletedTask);
    } else {
      res.status(404).json({message: "Task not found"});
    }
  } catch (error) {
    res.status(500).json({error});
  }
};

export const getTasksByUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const userTasks = await Task.find({userId});
    res.json(userTasks);
  } catch (error) {
    res.status(500).json({error});
  }
};