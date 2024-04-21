
import mongoose, { Document } from 'mongoose';
import { string } from 'zod';

import {IUser} from "@/models/User.model";


export interface IStudent extends Document {
    
    enrollmentNo: string;
    parentName: string;
    parentContactNo: string;
    fingerNo: string;
    course: string;
    college: string;
    roomNo: string;
    user: IUser;
    programe: string;
}


const studentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        parentName: {
            type: String,
            required: true,
            trim: true
        },
        enrollmentNo: {
            type: String,
            required: true,
            unique: true,
        },
        parentContactNo: {
            type: String,
            required: true
        },
        enrollmentNumber: {
            type: String,  
            required: true,
            unique: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        college: {
            type: String,
            required: true,
        },
        fingerNo: {
            type: String,
            required: true,
            unique: true
        },
        roomNo: {
            type: String,
            required: true
        },
        programe: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Student = mongoose.models.Student<IStudent> || mongoose.model('Student', studentSchema);

export default Student;


