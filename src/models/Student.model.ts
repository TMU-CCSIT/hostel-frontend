
import mongoose, { Document } from 'mongoose';
<<<<<<< HEAD

// import AdditionalDetails from './additionalDetails.model';

export interface IStudent extends Document {
    fullName: string;
    email: string;
    password: string;
    enrollmentNumber: string;
    contactNumber: number;
    course: string;
    college: string;
    // additionalDetails: IAdditionalDetails;
    fingerNumber: string;
    roomNumber: string;
    isVerified: boolean;
    token?: string;
    tokenExpiry?: Date;
=======
import { IUser } from '@/models/user.model';


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
>>>>>>> ca70cb6ceb252db502950e1bb9aff7dfdec7e163
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
<<<<<<< HEAD
            required: true
        },
        enrollmentNumber: {
            type: String,  // 
            required: true,
            unique: true,
        },
        contactNumber: {
            type: Number,
=======
>>>>>>> ca70cb6ceb252db502950e1bb9aff7dfdec7e163
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


