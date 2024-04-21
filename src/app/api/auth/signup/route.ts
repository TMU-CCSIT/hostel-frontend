
import { z } from "zod";

import { dbConnection } from "@/config/dbConfig";

import { isEmailAlreadyExist } from "@/helper/isEmailExists";

import bcrypt from "bcrypt";

import { sendEmail } from "@/helper/sendMail";

import { NextRequest, NextResponse } from "next/server";

import Student from "@/models/Student.model";

import { model } from "mongoose";

// import AdditionalDetails from "@/models/additionalDetails.model";

dbConnection();


const signupSchema = z.object({

    fullName: z.string(),
    email: z.string().email(),
    password: z.string(),
    enrollmentNo: z.string(),
    contactNo: z.string(),
    course: z.string(),
    college: z.string(),
    fingerNo: z.string(),
    programe:z.string(),
    roomNo: z.string(),
    parentName: z.string(),
    parentContactNo: z.string(),
    address: z.string(),
    

});


export async function POST(req: NextRequest) {

    try {

        // fetch data 

        console.log("hellow ");

        const body = await req.json();

        console.log("body: ", body)

        // Validate request body

        try {

            signupSchema.parse(body);

        } catch (error: any) {

            // If validation fails, return error response

            return NextResponse
                .json(
                    {
                        message: "validation error ",
                        error: "",
                        data: null,
                        success: false,
                    }, {
                    status: 401
                });

        }


        const {

            fullName,
            email,
            password,
            enrollmentNo,
            contactNo,
            course,
            college,
            fingerNo,
            programe,
            roomNo,
            parentName,
            parentContactNo,
            address,
            role,

        } = body;


        // check the user is already exists 

        let isUserExists = await isEmailAlreadyExist(email);

        console.log("is user exists ");

        if (isUserExists) {

            return NextResponse
                .json(
                    {
                        message: "Email already registered, Please login to continue",
                        error: "",
                        data: null,
                        success: false,
                    }, {
                    status: 401
                });

        }

        // hash the passowrd
        let hashPassword = await bcrypt.hash(password, 10);

        console.log("hshsed password",hashPassword);
        

        // push this additional information to the userAddtional info field

        // create new user enrty in DB 


        const imageUrl = `https://ui-avatars.com/api/?name=${fullName}`;

        // newly created user 

        const newUser = await User.create({

            fullName,
            email,
            contactNo,
            address,
            role,
            password: hashPassword,
            profileImage:imageUrl,

        })

        // now create the new student 

        const newStudent = await Student.create({

            enrollmentNo,
            course,
            college,
            fingerNo,
            programe,
            roomNo,
            parentName,
            parentContactNo,
            user:newUser._id,

        });

    
        // send the mail to the user 

        await sendEmail(email,"verify",newStudent._id);


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
                    message: "some error occurred while creating a signup",
                    error: error.message,
                    data: null,
                    success: false,
                }, {
                status: 500
            });

    }
}


