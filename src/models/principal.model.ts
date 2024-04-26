
import mongoose, { Document } from 'mongoose';
import { COLLEGES } from '@/constants/constant';


export interface IPrincipal extends Document {
    college: string
}

const principalSchema = new mongoose.Schema(
    {
        college: {
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


