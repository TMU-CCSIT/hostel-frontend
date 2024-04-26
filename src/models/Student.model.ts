
import User from '@/models/user.model';
import { IUser } from "@/models/user.model";

import mongoose, { Document, Schema, Types } from 'mongoose';



export interface IStudent extends Document {

    enrollmentNo: string; 
    parentName: string;
    parentContactNo: string;
    fingerNo: string;
    course: string;
    college: string;
    roomNo: string;
    // user: Types.ObjectId | IUser;
    programe: string;
    qrCodeString?: string
}

const studentSchema: Schema = new Schema(
    {
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
        qrCode: {
            qrString: {
                type: String,
                default: "",
            },
            status: {

                type: Boolean,
                default: false,
            }
        }
    },
    {
        timestamps: true
    }
);


const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;


