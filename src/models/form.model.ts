import mongoose, { Document, IfAny } from 'mongoose';
import { STATUS } from "@/constants/constant";
import { IStudent } from '@/models/student.model';

export interface IForm extends Document {
    student: IStudent;
    dateFrom: Date;
    dateTo: Date;
    reasonForLeave: string;
    addressDuringLeave: string;
    status: {
        coordinator: STATUS;
        hostelWarden: STATUS;
    };
}


const leaveFormSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        },
        dateFrom: {
            type: Date,
            required: true
        },
        dateTo: {
            type: Date,
            required: true
        },
        reasonForLeave: {
            type: String,
            required: true
        },
        addressDuringLeave: {
            type: String,
            required: true
        },
        status: {
            coordinator: {
                type: String,
                enum: Object.values(STATUS),
                default: STATUS.PENDING
            },
            hostelWarden: {
                type: String,
                enum: Object.values(STATUS),
                default: STATUS.PENDING
            }
        }
    },
    {
        timestamps: true
    }
);


const LeaveForm = mongoose.models.LeaveForm<IForm> || mongoose.model('LeaveForm', leaveFormSchema);

export default LeaveForm;

