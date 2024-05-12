import { HOSTEL } from '@/constants/constant';
import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
    enrollmentNo: string;
    parentName: string;
    parentContactNo: string;
    fingerNo: string;
    college: string;
    hostel: string,
    roomNo: string;
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
        hostel: {
            type: String,
            enum: HOSTEL,
            required: true
        },
        parentContactNo: {
            type: String,
            required: true
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
        },
    },
    {
        timestamps: true
    }
);


const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;




