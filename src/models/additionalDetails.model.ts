import mongoose from 'mongoose'

const additionalDetailsSchema = new mongoose.Schema(
    {
        fatherName:{
            type:String,
            required:true
        },
        parentContact:{
            type:Number,
            required:true
        },
        addrerss:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model("additionalDetails", additionalDetailsSchema);