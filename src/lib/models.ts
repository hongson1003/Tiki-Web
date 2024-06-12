import mongoose, { Schema, mongo } from "mongoose";
import { seedRoles } from "./seeders";

export interface RoleModel{
    name: string;
    key: string;
}

export interface UserModel{
    name?: string;
    username?: string;
    password?: string;
    phoneNumber?: string;
    image?: string;
    role?: string;
    type: string;
}

const roleSchema: Schema<RoleModel> = new mongoose.Schema({
    name: String,
    key: {
        type: String,
        required: true,
        unique: true,
    },
});

export const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);

const userSchema: Schema<UserModel> = new mongoose.Schema({ 
    name: { type: String },
    username: { type: String, required: true },
    password: { type: String},
    phoneNumber: { type: String },
    image: { type: String}, 
    role: { 
        type: String, 
        required: true, 
        ref: "Role",
    },
    type: { type: String, required: true, default: "CREDENTIALS" }
 }, { timestamps: true });

 userSchema.index({ username: 1, type: 1 }, { unique: true });


export const User = mongoose.models.User || mongoose.model("User", userSchema);



