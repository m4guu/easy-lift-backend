export const UsersService = jest.fn().mockReturnValue({
  findOne: jest.fn(),
  findTrainersByQuery: jest.fn(),
  findUserByEmail: jest.fn(),
  create: jest.fn(),
  configureUser: jest.fn(),
  updateUserWeight: jest.fn(),
  configureTrainer: jest.fn(),
  updateEmail: jest.fn(),
  updatePassword: jest.fn(),
});
