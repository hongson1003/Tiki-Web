import { start } from 'repl';
import {Role, Strategy} from '../models';

const strategies = [
    {
        name: 'Đồ dùng gia đình',
        description: 'Đồ dùng gia đình giảm giá 50%',
        image: '/images/homePage/main/slide/do-dung-gia-dinh-50.png',
        discount: 50,
        startDate: new Date('2024-06-17'),
        endDate: new Date('2024-06-24')
    },
    {
        name: 'Giải đặc biệt',
        description: 'Giải đặc biệt giảm giá 30%',
        image: '/images/homePage/main/slide/giai-dac-biet.jpg',
        discount: 30,
        startDate: new Date('2024-06-17'),
        endDate: new Date('2024-06-25')
    },
    {
        name: 'Lễ vu lan mùa yêu thương',
        description: 'Lễ vu lan mùa yêu thương giảm giá 40%',
        image: '/images/homePage/main/slide/le-vu-lan-mua-yeu-thuong.png',
        discount: 40,
        startDate: new Date('2024-06-17'),
        endDate: new Date('2024-06-26')
    },
    {
        name: 'Mùa sale huyền thoại',
        description: 'Mùa sale huyền thoại giảm giá 50%',
        image: '/images/homePage/main/slide/mua-sale-huyen-thoai.jpg',
        discount: 50,
        startDate: new Date('2024-06-17'),
        endDate: new Date('2024-06-27')
    },
    {
        name: 'Mùa sale laptop',
        description: 'Mùa sale laptop giảm giá 35%',
        image: '/images/homePage/main/slide/mua-sale-lap-top.jpg',
        discount: 35,
        startDate: new Date('2024-06-17'),
        endDate: new Date('2024-06-28')
    },
]

// persist data to database


export const strategySeeders = async () => {
    try {
        await Strategy.insertMany(strategies);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
        }
    }
}


