// importing necessities
import { z } from 'zod';
import Student from '@/models/student.model';
import LeaveForm from '@/models/form.model';
import { NextRequest, NextResponse } from 'next/server';
import { dbConnection } from '@/config/dbConfig';

dbConnection();

// validating by zod
const studentSchema = z.object({
    dateFrom: z.date(),
    dateTo: z.date(),
    reasonForLeave: z.string(),
    addressDuringLeave: z.string(),
});


const validateDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    const currentDate = new Date();
    return date > currentDate;
}


export async function POST(req: NextRequest, res: NextResponse) {

    try {
        // initializing body
        const body = await req.json();

        console.log("body: ", body);

        // validation by parsing
        try {
            studentSchema.safeParse(body);
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

        // getting data by destructuring
        const {
            dateFrom,
            dateTo,
            reasonForLeave,
            addressDuringLeave
        } = body;

        const userId = "";

        const isDateValid = validateDate(dateFrom);

        if (!isDateValid) {
            return NextResponse.json(
                {
                    message: "please enter a valid date",
                    success: false,
                    data: null,
                    error: "please enter a valid date",
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
                    error: "user does not exist",
                    data: null
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
                error: null,
                data: null
            }, {
            status: 200
        }
        );
    }

    // catch block 
    catch (err: any) {
        return NextResponse.json(
            {
                message: "problem in leave form creation controller",
                success: false,
                error: err.message,
                data: null
            }, {
            status: 400
        }
        );
    }
}