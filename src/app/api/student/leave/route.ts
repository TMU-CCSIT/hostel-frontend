// importing necessities
import { z } from 'zod';
import Student from '@/models/student.model';
import LeaveForm from '@/models/form.model';
import { NextRequest, NextResponse } from 'next/server';


// validating by zod
const studentSchema = z.object({
    userId: z.string(),
    dateFrom: z.date(),
    dateTo: z.date(),
    reasonForLeave: z.string(),
    addressDuringLeave: z.string(),
});


const validateDate = (date: Date): boolean => {
    const currentDate = new Date();
    return date >= currentDate;
}


export async function POST(req: NextRequest, res: NextResponse) {

    console.log("reached----------")

    try {
        // initializing body
        const body = await req.json();

        console.log("body: ", body);

        // validation by parsing
        try {
            studentSchema.parse(body);
        } catch (err) {
            return NextResponse.json(
                {
                    message: "Validation error in parsing data",
                    error: err,
                    data: null,
                    success: false,
                }, {
                status: 400
            }
            );
        }

        console.log("parsed--")


        // getting data by destructuring
        const {
            userId,
            dateFrom,
            dateTo,
            reasonForLeave,
            addressDuringLeave
        } = body;


        if (!validateDate) {
            return NextResponse.json(
                {
                    message: "please enter a valid date",
                    success: false,
                }, {
                status: 400
            });
        }

        // check if user exist or not
        const userExist = await Student.findById(userId);

        if (!userExist) {
            return NextResponse.json(
                {
                    message: "user does not exist",
                    success: false,
                }, {
                status: 400
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
                message: "leave form creation successfull",
                success: true,
            }, {
            status: 200
        }
        );

    }

    // catch block 
    catch (err) {
        return NextResponse.json(
            {
                message: "problem in leave form creation controller",
                success: false,
            }, {
            status: 400
        }
        );
    }
}