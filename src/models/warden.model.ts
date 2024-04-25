
import mongoose, { Document } from 'mongoose';
import { IUser } from '@/models/user.model';
import { HOSTEL } from '@/constants/constant';


export interface IWarden extends Document {

    user: IUser;
    hostel: HOSTEL;

}

const wardenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        hostel: {
            type: String,
            enum: Object.values(HOSTEL),
            reduired: true
        },
    },
    {
        timestamps: true
    }
);


const Warden = mongoose.models.Warden<IWarden> || mongoose.model('Warden', wardenSchema);
export default Warden;



