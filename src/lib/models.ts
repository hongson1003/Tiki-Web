import { RoleModel } from "@/models/role";
import { UserModel } from "@/models/user";
import mongoose, { Schema, mongo } from "mongoose";



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

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
})

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

const StrategySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
    discount: {
        type: Number,
        required: true,
    },
})

export const Strategy = mongoose.models.Strategy || mongoose.model("Strategy", StrategySchema);
