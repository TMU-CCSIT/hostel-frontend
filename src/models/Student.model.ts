
import mongoose, { Document } from 'mongoose';

export interface Student extends Document {
    fullName: string;
    email: string;
    password: string;
    enrollmentNumber: number;
    contactNumber: number;
    course: string;
    college: string;
    additionalDetails: mongoose.Types.ObjectId;
    fingerNumber: number;
    roomNumber: string;
    isVerified: boolean;
    otp?: string;
    otpExpiry?: Date;
    resetPasswordToken?: string;
    resetPasswordTokenExpiry?: Date;
}

const studentSchema = new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        enrollmentNumber:{
            type:Number,
            required:true,
            unique:true
        },
        contactNumber:{
            type:Number,
            required:true,
        },
        course:{
            type:String,
            required:true,
        },
        college:{
            type:String,
            required:true,
        },
        additionalDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"AdditionalDetails",
            required:true
        },
        fingerNumber:{
            type:Number,
            required:true,
            unique:true
        },
        roomNumber:{
            type:String,
            required:true
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        otp:{
            type:String,
        },
        otpExpiry:{
            type:Date,
        },
        resetPasswordToken:{
            type:String
        },
        resetPasswordTokenExpiry:{
            type:Date
        }
    }
)

const Student = mongoose.model<Student>("Student", studentSchema);

export default Student;