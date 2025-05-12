import { UserService } from './userService';
import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/user';

const mockUserRepository: jest.Mocked<UserRepository> = {
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockUserRepository);
    jest.clearAllMocks();
  });

  it('should get a user by ID', async () => {
    const user: User = { id: '1', name: 'Test User', email: 'test@example.com' };
    mockUserRepository.getUserById.mockResolvedValue(user);

    const result = await userService.getUser('1');

    expect(mockUserRepository.getUserById).toHaveBeenCalledWith('1');
    expect(result).toEqual(user);
  });

  it('should create a user', async () => {
    const user: User = { name: 'Test User', email: 'test@example.com' };
    mockUserRepository.createUser.mockResolvedValue({ id: '1', ...user });

    const result = await userService.createUser(user);

    expect(mockUserRepository.createUser).toHaveBeenCalledWith(user);
    expect(result).toEqual({ id: '1', ...user });
  });

  it('should return an error for invalid user data (create)', async () => {
    const user: User = { name: '', email: '' };
    const result = await userService.createUser(user);
    expect(result).toEqual('Invalid user data');
    expect(mockUserRepository.createUser).not.toHaveBeenCalled();
  });

  it('should update a user', async () => {
    const user: User = { name: 'Updated User', email: 'updated@example.com' };
    mockUserRepository.updateUser.mockResolvedValue({ id: '1', ...user });

    const result = await userService.updateUser('1', user);

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith('1', user);
    expect(result).toEqual({ id: '1', ...user });
  });

  it('should return an error for invalid user data (update)', async () => {
    const user: User = { name: '', email: '' };
    const result = await userService.updateUser('1', user);
    expect(result).toEqual('Invalid user data');
    expect(mockUserRepository.updateUser).not.toHaveBeenCalled();
  });

  it('should return null if update user fails', async () => {
    const user: User = { name: 'Updated User', email: 'updated@example.com' };
    mockUserRepository.updateUser.mockResolvedValue(null);

    const result = await userService.updateUser('1', user);

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith('1', user);
    expect(result).toBeNull();
  });

  it('should delete a user', async () => {
    mockUserRepository.deleteUser.mockResolvedValue(true);

    const result = await userService.deleteUser('1');

    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith('1');
    expect(result).toBe(true);
  });

  it('should return false if delete user fails', async () => {
    mockUserRepository.deleteUser.mockResolvedValue(false);
    const result = await userService.deleteUser('1');
    expect(result).toBe(false);
    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith('1');
  });
});