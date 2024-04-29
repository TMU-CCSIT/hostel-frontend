import { z } from "zod";
import { dbConnection } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";

import User from "@/models/user.model";

import Student from "@/models/student.model";

import { middleware } from "@/middleware";

import { createUserAndSetSession } from "@/action/userSignup";



dbConnection();

interface CustomNextRequest extends NextRequest {

    user: string,

}


const signupSchema = z.object({

    enrollmentNo: z.string(),
    branch: z.string(),
    college: z.string(),
    fingerNo: z.string(),
    programe: z.string(),
    roomNo: z.string(),
    parentName: z.string(),
    parentContactNo: z.string(),
    hostel: z.string(),

});


async function createStudentAndSetSession(student: any, session: any) {

    try {

        // Validate student data

        try {

            signupSchema.parse(student);

        } catch (error: any) {

            // If validation fails, throw error
            console.error('Validation error:', error.errors);
            throw new Error('Validation error');

        }

        const {

            enrollmentNo,
            branch,
            college,
            fingerNo,
            programe,
            roomNo,
            parentName,
            parentContactNo,
            hostel,

        } = student;

        console.log("all done ");

        // Create a new student instance
        const newStudent = await Student.create({
            enrollmentNo,
            branch,
            college,
            fingerNo,
            programe,
            roomNo,
            parentName,
            parentContactNo,
            hostel
        });

        // Save the student to the database within the provided session

        // const savedStudent = await newStudent.save({ session });

        // console.log("saved stident ", savedStudent);

        // return savedStudent;

        return newStudent;

    } catch (error: any) {

        console.error('Error creating student:', error.message);

        throw error;
    }
}





export async function POST(req: NextRequest) {

    try {

        const session = await mongoose.startSession();

        session.startTransaction();

        // Parse request body
        const body = await req.json();

        const { user, student } = body;

        let savedUser;

        let savedStudent;

        // Create user and student within the same transaction
        try {

            // Create user and set session

            savedStudent = await createStudentAndSetSession(student, session);

            console.log("saved student ", savedStudent);

            savedUser = await createUserAndSetSession(user, session, savedStudent._id);

            console.log("saved user ", savedUser);

            // Create student within the same session

            // Commit transaction

            await session.commitTransaction();

            session.endSession();

            // Return success response
            return NextResponse.json({

                message: "Student Signup Successfully",
                error: "",
                data: { user: savedUser, student: savedStudent },
                success: true,

            }, {
                status: 200
            });
        } catch (error: any) {

            console.error(error.message);

            // Rollback transaction if an error occurs
            await session.abortTransaction();
            session.endSession();

            return NextResponse.json({
                message: "Some error occurred while creating a student",
                error: error.message,
                data: null,
                success: false,
            }, {
                status: 500
            });
        }

        // Commit transaction

        await session.commitTransaction();

        session.endSession();

        // Return success response
        return NextResponse.json({

            message: "Student Signup Successfully",
            error: "",
            data: { user: savedUser, student: savedStudent },
            success: true,

        }, {

            status: 200

        });

    } catch (error: any) {

        console.error(error.message);

        return NextResponse.json({
            message: "Some error occurred while creating a student",
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



