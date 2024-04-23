
import { string, z } from "zod";

import { NextRequest, NextResponse } from "next/server";

import Coordinator from "@/models/coordinator.model";

interface CustomNextRequest extends NextRequest {

    user: string;
}

let coordinatorSchema = z.object({

    college: z.string(),
    course: z.string(),
    userId: z.string(),
    programe: z.string(),


})


export async function POST(req: NextRequest, res: NextResponse) {

    try {

        let body = await req.json();

        try {

            coordinatorSchema.parse(body);


        } catch (error: any) {


            console.log(error.message);

            return NextResponse
                .json(
                    {
                        message: "validation error ",
                        error: "",
                        data: null,
                        success: false,
                    },
                    {
                        status: 401
                    }
                );

        }



        const { college, course, userId, programe } = body;


        //create the new entry in Db 


        const newUser = await Coordinator.create({

            college,
            course,
            user: userId,
            programe,
        })

        // successfully return the resposne 


        return NextResponse
            .json(
                {
                    message: "coordinator  Signup Successfully",
                    error: "",
                    data: newUser,
                    success: true,
                }, {
                status: 200
            });




    } catch (error: any) {


        console.log(error.message);

        return NextResponse
            .json(
                {
                    message: "some error occurred while creating a Coordinator",
                    error: error.message,
                    data: null,
                    success: false,
                }, {
                status: 500
            });

    }
}




export async function GET(req: CustomNextRequest, res: NextResponse) {

    try {

        // const { userId } = body;

        let userId = req.user;


        if (!userId) {

            return NextResponse
                .json(
                    {
                        message: "user id is not provided  ",
                        error: "",
                        data: null,
                        success: false,
                    },
                    {
                        status: 401
                    }
                );
        }


        const coordinator = await Coordinator.findOne({ user: userId });

        if (!coordinator) {

            return NextResponse
                .json(
                    {
                        message: "no coordinator found with id '" + userId,
                        error: "",
                        data: null,
                        success: false,
                    },
                    {
                        status: 401
                    }
                );
        }


        return NextResponse
            .json(
                {
                    message: "Sucessfully find coordinator details  '" + userId,
                    error: "",
                    data: coordinator,
                    success: false,
                },
                {
                    status: 200
                }
            );



    } catch (error: any) {

        console.log(error.message);

        return NextResponse
            .json(
                {
                    message: "some error occurred while creating a Coordinator",
                    error: error.message,
                    data: null,
                    success: false,
                }, {
                status: 500
            });

    }
}



