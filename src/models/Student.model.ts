
import mongoose, { Document } from 'mongoose';
import { IUser } from '@/models/user.model';


export interface IStudent extends Document {
    enrollmentNo: string;
    contactNo: string;
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
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        parentName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        enrollmentNo: {
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
        parentContactNo: {
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
    }
);

const Student = mongoose.models.Student<IStudent> || mongoose.model('Student', studentSchema);
export default Student;


