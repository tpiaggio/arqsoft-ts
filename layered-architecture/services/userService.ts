import { User, validateUser } from '../models/user';
import { UserRepository, InMemoryUserRepository } from '../repositories/userRepository';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository = new InMemoryUserRepository()) {
    this.userRepository = userRepository;
  }

  async getUser(id: string): Promise<User | null> {
    try {
      return await this.userRepository.getUserById(id);
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async createUser(user: User): Promise<User | string> {
    if (!validateUser(user)) {
      return "Invalid user data";
    }

    try {
      return await this.userRepository.createUser(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: string, user: User): Promise<User | null | string> {
    if (!validateUser(user)) {
      return "Invalid user data";
    }
    try {
      return await this.userRepository.updateUser(id, user);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      return await this.userRepository.deleteUser(id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
