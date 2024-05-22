import mongoose, { Document, ObjectId } from 'mongoose';
import { ROLE } from '@/constants/constant';
import { IStudent } from './student.model';
import { IWarden } from './warden.model';
import { IPrincipal } from './principal.model';
import Coordinator, { ICoordinator } from './coordinator.model'; // Import Coordinator interface

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    contactNo: string;
    role: ROLE;
    isVerified: boolean;
    token?: string;
    tokenExpiry?: Date;
    address: string;
    refId: IStudent | IWarden | ICoordinator | IPrincipal;
}


const userSchema = new mongoose.Schema(
    {
        refId: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "role",
            required: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        profileImage: {
            type: String
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
        contactNo: {
            type: String,
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
        address: {
            type: String
        }
    },
    {
        timestamps: true
    }
);




export const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
