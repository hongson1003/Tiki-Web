import { CategoryModel } from "./category";

export interface StrategyModel {
    _id?: string;
    name?: string;
    description?: string;
    image?: string;
    startDate?: Date;
    endDate?: Date;
    categories?: CategoryModel[];
    discount?: number;
}