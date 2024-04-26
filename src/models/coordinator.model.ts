
import mongoose, { Document } from 'mongoose';

import { ProgrameData } from '@/constants/constant';

export interface ICoordinator extends Document {

    college: string;
    course: string;
    programe: string;
}


const coordinatorSchema = new mongoose.Schema(
    {
        college: {
            type: String,
            required: true,
        },
        branch:[{

            type: String,
            required: true,

        }],
        programe: {

            type: ProgrameData,
            required: true

        },
    },
    {
        timestamps: true
    }
);

const Coordinator = mongoose.models.Coordinator<ICoordinator> || mongoose.model('Coordinator', coordinatorSchema);

export default Coordinator;



