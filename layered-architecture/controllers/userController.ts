import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export async function getUser(req: Request, res: Response): Promise<void> {
  const user = await userService.getUser(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
}

export async function createUser(req: Request, res: Response):Promise<void> {
    const creationResult = await userService.createUser(req.body);
    if (typeof creationResult === 'string'){
        res.status(400).send(creationResult);
    } else {
        res.status(201).json(creationResult);
    }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  const updateResult = await userService.updateUser(req.params.id, req.body);
  if(typeof updateResult === 'string'){
      res.status(400).send(updateResult);
  } else if (updateResult){
      res.json(updateResult);
  } else {
      res.status(404).send('User not found');
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const deletionResult = await userService.deleteUser(req.params.id);
  if (deletionResult){
      res.status(204).send();
  } else {
      res.status(404).send('User not found');
  }
}
