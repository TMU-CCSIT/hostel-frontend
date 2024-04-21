import mongoose, { Document, IfAny } from 'mongoose';
import { STATUS } from "@/constants/constant";

import { IUser } from "@/models/User.model";

export interface IForm extends Document {
    user: IUser;
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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
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
                default: STATUS.Pending
            },
            hostelWarden: {
                type: String,
                enum: Object.values(STATUS),
                default: STATUS.Pending
            }
        }
    },
    {
        timestamps: true
    }
);


const LeaveForm = mongoose.models.LeaveForm<IForm> || mongoose.model('LeaveForm', leaveFormSchema);

export default LeaveForm;

