
import { z } from "zod";
import { dbConnection } from "@/config/dbConfig";
import { isEmailAlreadyExist } from "@/helper/isEmailExists";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import Student from "@/models/student.model";

import { model } from "mongoose";

import User from "@/models/user.model";

import { ROLE } from "@/constants/constant";

// import AdditionalDetails from "@/models/additionalDetails.model";

dbConnection();


const userSchema = z.object({

    fullName: z.string(),
    email: z.string().email(),
    password: z.string(),
    contactNo: z.string(),
    address: z.string(),
    role: z.string(),
});


export async function POST(req: NextRequest) {

    try {

        // fetch data 

        const body = await req.json();

        // Validate request body

        try {

            userSchema.parse(body);

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
            contactNo,
            address,
            role,

        } = body;

        // check the user is already exists 

        const isUserExists = await isEmailAlreadyExist(email);

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

        const hashPassword = await bcrypt.hash(password, 10);

        const imageUrl = `https://ui-avatars.com/api/?name=${fullName}`;

        // TODO: Get user Id from previous controller  and put it here

        // newly created user 
        const newUser = await User.create({

            fullName,
            email,
            contactNo,
            address,
            role: role,
            password: hashPassword,
            profileImage: imageUrl,
            isVerified: true,
            refId: "662a4ef75b20d2afa10cb446"
        })

        // send the mail to the user 

        // await sendEmail(email, "verify", newUser._id);

        // sucessfully return the response

        return NextResponse
            .json(
                {
                    message: "Student Signup Successfully",
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
                    message: "some error occurred while creating a signup",
                    error: error.message,
                    data: null,
                    success: false,
                }, {
                status: 500
            });

    }
}






