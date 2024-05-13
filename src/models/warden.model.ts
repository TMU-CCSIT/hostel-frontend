import mongoose, { Document } from 'mongoose';
import { HOSTEL } from '@/constants/constant';


export interface IWarden extends Document {
    hostel: string;
}

const wardenSchema = new mongoose.Schema(
    {
        hostel: {
            type: String,
            enum: HOSTEL,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Warden = mongoose.models.Warden || mongoose.model<IWarden>('Coordinator', wardenSchema);
export default Warden;



