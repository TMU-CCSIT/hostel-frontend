
import mongoose, { Document } from 'mongoose';
import { IUser } from '@/models/user.model';
import { COLLEGES } from '@/constants/constant';


export interface IPrincipal extends Document {
    user: IUser;
    college: string
}

const principalSchema = new mongoose.Schema(
    {
        hosetl: {
            type: String,
            enum: COLLEGES,
            required: true
        },
    },
    {
        timestamps: true
    }
);


const Principal = mongoose.models.Principal<IPrincipal> || mongoose.model('Principal', principalSchema);
export default Principal;


