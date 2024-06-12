// utils/api.ts
import { User as UserType } from "@/types/next-auth";
import { Role, User } from "./models";
import { comparePassword, connectMongo } from "./ultils";

export const findOrCreateUser = async (user?: UserType): Promise<ResponseApi<UserType>> => {
  try {
    await connectMongo();
    const myUser = await User.findOne({
      username: user?.username,
      type: user?.type
    }).populate('role');

    if (myUser) {
      return {
        errCode: 0,
        message: 'User already exists',
        data: JSON.parse(JSON.stringify(myUser)) as UserType
      };
    }
    const newUser = new User(user);
    await newUser.save();
    return {
      errCode: 0,
      message: 'Create user successfully',
      data: JSON.parse(JSON.stringify(newUser)) as UserType
    };
  } catch (error) {
    console.error(error);
    return {
      errCode: -1,
      message: 'Error from server',
      data: null
    };
  }
};

export const getRoleByKey = async (key: string) => {
  try {
    await connectMongo();
    const role = await Role.findOne({ key });
    return role;
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (): Promise<ResponseApi<UserType[]>> => {
  try {
    await connectMongo();
    const users = await User.find();
    return {
      errCode: 0,
      message: 'Fetched users successfully',
      data: users as UserType[]
    };
  } catch (error) {
    console.error(error);
    return {
      errCode: -1,
      message: 'Error from server',
      data: null
    };
  }
};

export const login = async (username: string, password: string): Promise<ResponseApi<UserType>> => {
  try {
    await connectMongo();
    const user = await User.findOne({ username });
    if (!user) {
      return {
        errCode: -1,
        message: 'User not found',
        data: null
      };
    }
    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return {
        errCode: -1,
        message: 'Password is incorrect',
        data: null
      };
    }
    return {
      errCode: 0,
      message: 'Logged in successfully',
      data: JSON.parse(JSON.stringify(user)) as UserType
    };
  } catch (error) {
    return {
      errCode: -1,
      message: 'Error from server',
      data: null
    };
  }
}
