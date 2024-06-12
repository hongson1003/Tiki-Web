import {Role} from './models';

const roleSeeder = [
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


export const seedRoles = async () => {
    try {
        await Role.insertMany(roleSeeder);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
        }
    }
}


