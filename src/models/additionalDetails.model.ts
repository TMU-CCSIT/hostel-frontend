// models/AdditionalDetails.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IAdditionalDetails extends Document {
    fatherName: string;
    parentContact: number;
    address: string;
}

const additionalDetailsSchema: Schema = new Schema({
    fatherName: {
        type: String,
        required: true
    },
    parentContact: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const AdditionalDetails = mongoose.model<IAdditionalDetails>("AdditionalDetails", additionalDetailsSchema);

export default AdditionalDetails;
