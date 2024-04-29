
import mongoose, { Document } from 'mongoose';

import { IUser } from '@/models/user.model';

import { HOSTEL } from '@/constants/constant';


export interface IWarden extends Document {

    hostel: string;

}

const wardenSchema = new mongoose.Schema(
    {
        hostel: {
            type: String,
            reduired: true
        },
    },
    {
        timestamps: true
    }
);


const Warden = mongoose.model('Warden', wardenSchema) || mongoose.models.Warden<IWarden>;
export default Warden;



