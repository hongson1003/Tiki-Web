import {Role} from '../models';

const roles = [
    {
        name: 'admin',
        key: 'ADMIN',
        description: 'Admin role'
    },
    {
        name: 'user',
        key: 'USER',
        description: 'User role'
    },
]

// persist data to database


export const roleSeeders = async () => {
    try {
        await Role.insertMany(roles);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
        }
    }
}


