import express from 'express';
import dotenv from 'dotenv';
import { getUser, createUser, updateUser, deleteUser } from './controllers/userController';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/users/:id', getUser);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

app.listen(port, () => {
  console.log('Server listening on port 3000');
});