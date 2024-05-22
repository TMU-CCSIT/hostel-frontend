
import mongoose, { Document } from 'mongoose';

import { COLLEGES } from '@/constants/constant';

import { PROGRAME } from '@/constants/constant';

export interface ICoordinator extends Document {

    college: string;
    programe: string;
    branches: string[]; // Array of branches
}


const coordinatorSchema = new mongoose.Schema(
    {
        college: {

            type: String,
            enum: Object.keys(COLLEGES), // Restrict to valid college keys
            required: true
        },
        programe: {

            type: String,
            // enum: Object.keys(PROGRAME), // Restrict to valid program keys
            required: true
        },
        branches: [{

            type: String,
            required: true

        }]

    },
    {
        timestamps: true
    }
);

const Coordinator = mongoose.models.Coordinator || mongoose.model<ICoordinator>('Coordinator', coordinatorSchema);

export default Coordinator;






