'use server'

import { SignUpFormValues } from "@/components/auth/signUp.auth"
import { findOrCreateUser } from "@/lib/data"
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

export const reRenderHeader = async () => {
    revalidatePath('/');
}