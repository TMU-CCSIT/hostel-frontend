import { z } from "zod";
import { dbConnection } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/user.model";

import Student from "@/models/student.model";

import { middleware } from "@/middleware";


dbConnection();

interface CustomNextRequest extends NextRequest {
<<<<<<< HEAD
    id: string,
=======

    user: string,
>>>>>>> 7cbb71433269ce5dbf4de6339bab08bd4051f8be
}



const signupSchema = z.object({
    enrollmentNo: z.string(),
    course: z.string(),
    college: z.string(),
    fingerNo: z.string(),
    programe: z.string(),
    roomNo: z.string(),
    parentName: z.string(),
    parentContactNo: z.string(),
});


export async function POST(req: NextRequest) {

    try {
        // fetch data 
        const body = await req.json();


        // Validate request body
        try {

            signupSchema.parse(body);

        } catch (error: any) {

            // If validation fails, return error response
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

        const {
            enrollmentNo,
            course,
            college,
            fingerNo,
            programe,
            roomNo,
            parentName,
            parentContactNo,
            userId,

        } = body;


        const newStudent = await Student.create({
            enrollmentNo,
            course,
            college,
            fingerNo,
            programe,
            roomNo,
            parentName,
            parentContactNo,
            user: userId,
        })

        // sucessfully return the response
        return NextResponse
            .json(
                {
                    message: "Student Signup Successfully",
                    error: "",
                    data: newStudent,
                    success: true,
                }, {
                status: 200
            });


    } catch (error: any) {

        console.log(error.message);

        return NextResponse
            .json(
                {
                    message: "some error occurred while creating a Student",
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

        await middleware(req);

        let userId = req.user;

        // console.log(req);

        console.log(userId);

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


        const studentDetails = await Student.findOne({ user: userId });


        // console.log("student : ",studentDetails)

        if (!studentDetails) {

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

        const userDetails = await User.findOne({ _id: userId });

        return NextResponse
            .json(
                {
                    message: "Sucessfully find Student details  '" + userId,
                    error: "",
                    data: { studentDetails, userDetails },
                    success: true,
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
                    message: "some error occurred while creating a Student",
                    error: error.message,
                    data: null,
                    success: false,
                }, {
                status: 500
            });

    }
}



