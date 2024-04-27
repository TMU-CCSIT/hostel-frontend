
import { NextRequest, NextResponse } from "next/server";

import { isEmailAlreadyExist } from "@/helper/isEmailExists";

import { sendMail } from "@/helper/sendMail";

import { z } from "zod";

const forgotField = z.object({

    email: z.string().email()

})


export async function POST(req: NextRequest, res: NextResponse) {

    try {

        const body = await req.json();

        try {

            const data = forgotField.parse(body);

        } catch (error: any) {

            console.log(error.message);

            return NextResponse.json({

                message: "all fields are not fullfilled ",
                data: null,
                error: error.message,

            }, {

                status: 400,

            })

        }


        // fetch the data 

        const { email } = body;


        const isUserExists = await isEmailAlreadyExist(email);

        // check user exists or not 

        if (!isUserExists) {


            return NextResponse.json({

                message: "no user exists with this email",
                data: null,
                error: null,

            }, {

                status: 400,

            })


        }


        // check  user is verified or not 

        if (isUserExists && !isUserExists?.isVerified) {


            return NextResponse.json({

                message: "user is not verified plz verify first ",
                data: null,
                error: null,

            }, {

                status: 400,

            })


        }

        // send th mail to the user 


        await sendMail(email,"resetPassword");

        // return the reponse 


        return NextResponse.json({

            message: "successfully sent mail to the user for forgot password  ",
            error: null,
            data: isUserExists,

        }, {

            status: 200,

        })
    

    } catch (error: any) {

        console.log(error.message);

        return NextResponse.json({

            message: "some error occurred while send mail to the user ",
            error: null,
            data: null,

        }, {

            status: 500,

        })


    }
}

