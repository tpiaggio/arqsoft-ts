import { User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

export interface UserRepository {
  getUserById(id: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  updateUser(id: string, user: User): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async getUserById(id: string): Promise<User | null> {
    console.log('getUserById:id', id);
    return this.users.find((user) => user.id === id) || null;
  }

  async createUser(user: User): Promise<User> {
    const newUser = { ...user, id: uuidv4() };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, user: User): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...user, id };
      return this.users[index];
    }
    return null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
