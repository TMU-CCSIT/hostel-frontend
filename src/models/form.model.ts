import mongoose, { Document } from 'mongoose';
import  {User}  from '@/models/User.model'; 

export interface IForm extends Document {
    user: mongoose.Types.ObjectId | User;
    from: Date;
    to: Date;
    reason: string;
    addressDuringLeave: string;
    status: number;
}

const formSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        from:{
            type:Date,
            required:true
        },
        to:{
            type:Date,
            required:true
        },
        reason:{
            type:String,
            required:true
        },
        addressDuringLeave:{
            type:String,
            required:true
        },
        status:{
            type:Number,
            required:true,
            default:0
        }
    }
)

const Form = mongoose.model<IForm>("Form", formSchema);

export default Form;