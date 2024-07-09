import User, { USER_TYPES } from '@src/models/User';
import Logging from '@src/utils/logging';
const UserService = {
  createUser: async (
    firstName: string,
    lastName: string,
    type: keyof typeof USER_TYPES,
  ): Promise<any> => {
    try {
      const user = new User({ firstName, lastName, type });
      user.save();
      return user;
    } catch (error: any) {
      Logging.error('Error on createUser service method:' + error);
      throw error;
    }
  },
  getUserById: async (id: string): Promise<any> => {
    try {
      const user = await User.findOne({ _id: id });
      return user;
    } catch (error: any) {
      Logging.error('Error on getUserById service method:' + error);
      throw error;
    }
  },
  getAllUsers: async (): Promise<any> => {
    try {
      const user = await User.find();
      return user;
    } catch (error: any) {
      Logging.error('Error on getAllUser service method:' + error);
      throw error;
    }
  },
  getUserByIds: async (ids: string[]): Promise<any> => {
    try {
      const users = await User.find({ _id: { $in: ids } });
      return users;
    } catch (error) {
      Logging.error('Error on getUserByIds service method:' + error);
      throw error;
    }
  },
};

export default UserService;
