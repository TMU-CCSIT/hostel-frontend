import { z } from "zod";
import { dbConnection } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Student from "@/models/Student.model";

dbConnection();

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