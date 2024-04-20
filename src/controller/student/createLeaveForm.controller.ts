
// importing necessities
import {z} from 'zod';
import Student from '@/models/Student.model';
import LeaveForm from '@/models/form.model';
import { NextRequest, NextResponse } from 'next/server';


// validating by zod
const studentSchema = z.object({
    userId: z.string(),
    dateFrom: z.date(),
    dateTo: z.date(),
    reasonForLeave: z.string(),
    addressDuringLeave: z.string(),
})


// main controller
exports.createLeaveForm = async (req: NextRequest,res: NextResponse) =>{

    try{
        // initializing body
        const body = await req.json();


        // validation by parsing
        try{
            studentSchema.parse(body);
        } catch(err){
            return NextResponse.json(
                {
                    message: "Validation error in parsing data",
                    error: err,
                    data: null,
                    success: false,
                },{
                    status:400
                }
            );
        }


        // getting data by destructuring
        const{
            userId,
            dateFrom,
            dateTo,
            reasonForLeave,
            addressDuringLeave
        } = body;



        // date validation (date should be more or equal to current date)
        const validateDate = (date: Date) :boolean =>{
            const currentDate = new Date();
            return date >=currentDate;
        }

        if(!validateDate){
            return NextResponse.json(
                {
                    message: "please enter a valid date",
                    success: false,
                },{
                    status:400
                }
            );
        }



        // check if user exist or not
        const userExist = await Student.findById(userId);

        if(!userId){
            return NextResponse.json(
                {
                    message: "user does not exist",
                    success: false,
                },{
                    status:400
                }
            );
        }



        // create entry in db 
        const leaveForm = await LeaveForm.create(
            {
                userId,
                dateFrom,
                dateTo,
                reasonForLeave,
                addressDuringLeave
            }
        );


        // return success response
        return NextResponse.json(
            {
                message:"leave form creation successfull",
                success:true,
            },{
                status:200
            }
        );

    }


    // catch block 
    catch(err){
        return NextResponse.json(
            {
                message: "problem in leave form creation controller",
                success: false,
            },{
                status:400
            }
        );
    }
}