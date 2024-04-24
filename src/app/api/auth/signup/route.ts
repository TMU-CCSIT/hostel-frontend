
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
    role:z.string(),
    
});


export async function POST(req: NextRequest) {

    try {

        // fetch data 

        console.log("hellow ");

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

        console.log("is user exists ",isUserExists);

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
            role:role,
            password: hashPassword,
            profileImage:imageUrl,
            isVerified:true,
        })
    

        // send the mail to the user 
        // await sendEmail(email, "verify", newStudent._id);

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


