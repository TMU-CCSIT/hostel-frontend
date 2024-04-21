
import { z } from "zod";

import { dbConnection } from "@/config/dbConfig";

import { isEmailAlreadyExist } from "@/helper/isEmailExists";

import bcrypt from "bcrypt";

import { sendEmail } from "@/helper/sendMail";

import { NextRequest, NextResponse } from "next/server";

import Student from "@/models/Student.model";
import User from "@/models/user.model";
import { ROLE } from "@/constants/constant";



dbConnection();


const signupSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string(),
    contactNo: z.string(),
    address: z.string(),
    role: z.string()
});

// course: z.string(),
// college: z.string(),
// fingerNo: z.string(),
// programe: z.string(),
// roomNo: z.string(),
// parentName: z.string(),
// parentContactNo: z.string(),
// enrollmentNo: z.string(),



export async function POST(req: NextRequest) {

    try {

        // fetch data 
        const body = await req.json();

        console.log("body: ", body)

        // Validate request body
        try {
            signupSchema.safeParse(body);
        } catch (error: any) {
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
            contactNo,
            email,
            password,
            address,
            role,
        } = body;


        // check the user is already exists 

        let isUserExists = await isEmailAlreadyExist(email);

        console.log("is user exists:  ", isUserExists);

        if (isUserExists) {

            return NextResponse
                .json(
                    {
                        message: "Email already registered, Please login to continue",
                        error: "",
                        data: null,
                        success: false,
                    },
                    {
                        status: 401
                    }
                );
        }

        // hash the passowrd
        let hashPassword = await bcrypt.hash(password, 10);

        console.log("hshsed password", hashPassword);

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
            profileImage: imageUrl,
        })


        // send the mail to the user 
        // await sendEmail(email, "verify", newStudent._id);

        // sucessfully return the response
        return NextResponse
            .json(
                {
                    message: "User Signup Successfully",
                    error: null,
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
                    message: "some error occurred while creating a signup",
                    error: error.message,
                    data: null,
                    success: false,
                }, {
                status: 500
            });

    }
}


