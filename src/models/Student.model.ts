
import mongoose, { Document } from 'mongoose';
import { IAdditionalDetails } from '@/models/AdditionalDetails.model';

export interface IStudent extends Document {
    fullName: string;
    email: string;
    password: string;
    enrollmentNumber: number;
    contactNumber: number;
    course: string;
    college: string;
    additionalDetails: IAdditionalDetails;
    fingerNumber: number;
    roomNumber: string;
    isVerified: boolean;
    token?: string;
    tokenExpiry?: Date;
}

const studentSchema = new mongoose.Schema(
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
        enrollmentNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        contactNumber: {
            type: Number,
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
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AdditionalDetails",
        },
        fingerNumber: {
            type: Number,
            required: true,
            unique: true
        },
        roomNumber: {
            type: String,
            required: true
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
        }
    }
)

const Student = mongoose.models.Student<IStudent> || mongoose.model('Student', studentSchema);
export default Student;


