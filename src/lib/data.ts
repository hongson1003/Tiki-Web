import { User as UserType } from "@/types/next-auth";
import { Category, Role, Strategy, User } from "@/lib/models";
import { comparePassword, connectMongo } from "./ultils";
import { CategoryModel } from "@/models/category";
import { StrategyModel } from "@/models/strategy";

export const findOrCreateUser = async (user?: UserType): Promise<ResponseApi<UserType>> => {
  try {
    await connectMongo();
    const myUser = await User.findOne({
      username: user?.username,
      type: user?.type
    }).populate('role');

    if (myUser) {
      return {
        errCode: 409,
        message: 'User already exists',
        data: JSON.parse(JSON.stringify(myUser)) as UserType
      };
    }
    const newUser = new User(user);
    await newUser.save();
    const role = await Role.findById(newUser.role);
    newUser.role = role;
    return {
      errCode: 201,
      message: 'Create user successfully',
      data: JSON.parse(JSON.stringify(newUser)) as UserType
    };
  } catch (error) {
    console.error(error);
    return {
      errCode: 500,
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
    const user = await User.findOne({ username, type: 'CREDENTIALS' });
    if (!user) {
      return {
        errCode: 404,
        message: 'User not found',
        data: null
      };
    }
    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return {
        errCode: 401,
        message: 'Password is incorrect',
        data: null
      };
    }
    delete user.password;
    return {
      errCode: 200,
      message: 'Logged in successfully',
      data: JSON.parse(JSON.stringify(user)) as UserType
    };
  } catch (error) {
    return {
      errCode: 500,
      message: 'Error from server',
      data: null
    };
  }
}

export const getCategoriesLoader = async (imit: number): Promise<ResponseApi<{categories: CategoryModel[], total: number}>> => {
  try {
    await connectMongo();
    const categories = await Category.find().limit(imit);
    const total = await Category.countDocuments();
    return {
      errCode: 200,
      message: 'Fetched categories successfully',
      data: {
        categories: JSON.parse(JSON.stringify(categories)) as CategoryModel[],
        total
      }
    };
  } catch (error) {
    console.error(error);
    return {
      errCode: 500,
      message: 'Error from server',
      data: null
    };
  }
}

export const getStrategies = async (): Promise<ResponseApi<StrategyModel[]>> => {
  try {
    await connectMongo();
    const strategies = await Strategy.find({
      startDate: {
        $lte: new Date()
      },
      endDate: {
        $gte: new Date()
      }
    });
    if (!strategies) {
      return {
        errCode: 404,
        message: 'Strategies not found',
        data: null
      };
    }
    return {
      errCode: 200,
      message: 'Fetched strategies successfully',
      data: JSON.parse(JSON.stringify(strategies))
    };
  } catch (error) {
    console.error(error);
    return {
      errCode: 500,
      message: 'Error from server',
      data: null
    };
  }
}
