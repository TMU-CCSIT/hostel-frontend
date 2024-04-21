import mongoose, { Document } from 'mongoose';
import { ROLE } from '@/constants/constant';

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    contactNumber: string;
    role: ROLE;
    isVerified: boolean;
    token?: string;
    tokenExpiry?: Date;
}


const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        contactNumber: {
            type: Number,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(ROLE),
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        token: {
            type: String
        },
        tokenExpiry: {
            type: Date
        },
    }
)

export const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;