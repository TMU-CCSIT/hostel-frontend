
import mongoose, { Document, Model } from 'mongoose';

 
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

// Use the existing model if it exists to prevent OverwriteModelError
const Warden: Model<IWarden> = mongoose.models.Warden || mongoose.model<IWarden>('Warden', wardenSchema);

export default Warden;
