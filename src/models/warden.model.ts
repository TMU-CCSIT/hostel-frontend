<<<<<<< HEAD
import mongoose, { Document } from 'mongoose';
=======
import mongoose, { Document, Model } from 'mongoose';

import { IUser } from '@/models/user.model';

>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
import { HOSTEL } from '@/constants/constant';

export interface IWarden extends Document {
    hostel: string;
}

const wardenSchema = new mongoose.Schema(
    {
        hostel: {
            type: String,
<<<<<<< HEAD
            enum: HOSTEL,
            required: true
=======
            required: true // Corrected 'required' spelling
>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
        },
    },
    {
        timestamps: true
    }
);

<<<<<<< HEAD
const Warden = mongoose.models.Warden || mongoose.model<IWarden>('Coordinator', wardenSchema);
=======
// Use the existing model if it exists to prevent OverwriteModelError
const Warden: Model<IWarden> = mongoose.models.Warden || mongoose.model<IWarden>('Warden', wardenSchema);

>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
export default Warden;
