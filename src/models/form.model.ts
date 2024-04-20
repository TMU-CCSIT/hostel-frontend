import mongoose from 'mongoose'

const formSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        addressDuringLeave: {
            type: String,
            required: true
        }
    }
);