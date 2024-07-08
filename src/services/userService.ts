import User, { USER_TYPES } from '@src/models/User';
import Logging from '@src/utils/logging';
const UserService = {
    createUser: async (firstName: string, lastName: string, type: keyof typeof USER_TYPES) => {
        try{
            const user = new User({firstName, lastName, type});
            user.save();
            return user;
        }
        catch (error: any) {
            Logging.error(error.message);
        }
    },
    getUserById: async (id: string) => {
        try{
            const user = await User.findOne({ _id: id });
            return user;
        }
        catch (error: any) {
            Logging.error(error.message);
        }
    },
    getAllUsers: async () => {
        try{
            const user = await User.find();
            return user;
        }
        catch (error: any) {
            Logging.error(error.message);
        }
    }
}

export default UserService;