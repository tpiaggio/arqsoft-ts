import {Request, Response} from "express";
import {Task} from "../models/task";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({error});
  }
};

export const getTask = async (req: Request, res: Response) => {
  const taskId: string = req.params.id;
  try {
    const task = await Task.findByPk(taskId);
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
    const task = await Task.create({userId, title, completed});
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({error});
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const taskId: string = req.params.id;
  try {
    const task = await Task.findByPk(taskId);
    if (task) {
      const updatedTask = await task.update(req.body);
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
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.destroy();
      res.status(200).json(task);
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
    const userTasks = await Task.findAll({where: {userId}});
    res.json(userTasks);
  } catch (error) {
    res.status(500).json({error});
  }
};