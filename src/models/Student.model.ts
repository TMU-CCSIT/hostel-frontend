
import mongoose, { Document, Schema, Types } from 'mongoose';
import { IUser } from "@/models/User.model";
import mongoose, { Document } from 'mongoose';

export interface IStudent extends Document {
    enrollmentNo: string;
    parentName: string;
    parentContactNo: string;
    fingerNo: string;
    course: string;
    college: string;
    roomNo: string;
    user: Types.ObjectId | IUser;
    programe: string;
    createdAt: Date;
    updatedAt: Date;
}

const studentSchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
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
        contactNo: {
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

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;