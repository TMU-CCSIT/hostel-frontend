import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true,
            trim:true
        },
        enrollmentNumber:{
            type:Number,
            required:true,
        },
        contactNumber:{
            type:Number,
            required:true,
        },
        course:{
            type:String,
            required:true,
        },
        college:{
            type:String,
            required:true,
        },
        additionalDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"additionalDetails",
            required:true
        },
        fingerNumber:{
            type:Number,
            required:true
        },
        roomNumber:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model("user", userSchema);