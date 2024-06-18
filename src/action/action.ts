'use server'

import { SignUpFormValues } from "@/components/auth/signUp.auth"
import { findOrCreateUser, getCategoriesLoader, getStrategies } from "@/lib/data"
import { hashPassword } from "@/lib/ultils";
import { User } from "@/types/next-auth";
import { revalidatePath } from "next/cache";

interface SignUpAction extends SignUpFormValues {
    type?: string;
    role?: string;
}

export const signUpAction = async (values: SignUpAction) => {
    try {
        values.password = await hashPassword(values.password);
        const res : ResponseApi<User> = await findOrCreateUser(values);
        if (res.errCode !== 500) {
            if (res.errCode === 409) {
                return null;
            }else {
                return res.data;
            }
        }
        return null;
    } catch (error) {
        console.log(error)
    }
}

export const reRenderHeaderAction = async () => {
    revalidatePath('/');
}

export const getCategoriesAction = async (limit: number) => {
    try {
        const res = await getCategoriesLoader(limit)
        return res
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getSliderAction = async () => {
    try {
        const res = await getStrategies();
        return res;
    } catch (error) {
        console.log(error)
        return null
    }
}