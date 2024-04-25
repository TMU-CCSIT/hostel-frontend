
import mongoose, { Document } from 'mongoose';
import { IUser } from '@/models/user.model';
import { COLLEGES, HOSTEL } from '@/constants/constant';


export interface IPrincipal extends Document {
    user: IUser;
    college: COLLEGES
}

const principalSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        hosetl: {
            type: String,
            enum: Object.values(COLLEGES),
            reduired: true
        },
    },
    {
        timestamps: true
    }
);


const Principal = mongoose.models.Principal<IPrincipal> || mongoose.model('Principal', principalSchema);
export default Principal;


