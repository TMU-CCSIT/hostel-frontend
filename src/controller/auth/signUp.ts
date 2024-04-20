
import { z } from "zod";

import {dbConnection} from "@/app/config/dbConfig";

import { isEmailAlreadyExist } from "@/helper/isEmailExists";

import bcrypt from "bcrypt";

import {sendEmail} from "@/helper/sendMail";

import { NextApiRequest,NextApiResponse } from "next";
import { error } from "console";

const signupSchema = z.object({

    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    course: z.string(),
    college: z.string(),
    fingerNumber: z.number(),
    rooomNumber: z.string(),
    fatherName: z.string(),
    address: z.string(),
    parentNumber: z.number(),

});

dbConnection();


export async function Signup(req:NextApiRequest, res:NextApiResponse) {

    try {

        // fetch data 

        const body = await req.json();

        // Validate request body

        try {

            signupSchema.parse(body);

        } catch (error: any) {

            // If validation fails, return error response

            return res.status(400).json({

                message: "Validation error",
                success: false,
                error: error.errors,
                data: null

            });
        }


        const {

            fullName,
            email,
            password,
            course,
            college,
            fingerNumber,
            rooomNumber,
            fatherName,
            address,
            parentNumber

        } = body;


        // check the user is already exists 

        let isUserExists = isEmailAlreadyExist(email);


        if(isUserExists){

            return res.status(400).json({

                message: "Email already registered, Please login to continue",
                error: "Email already registered, Please login to continue",
                success: false,
                data: null

            });

        }

        // hash the passowrd

        let hashPassword = await bcrypt.hash(password,10);


        // create new user enrty in DB 

        const newUser = await user.create({

            fullName,
            email,
            password,
            course,
            college,
            fingerNumber,
            rooomNumber,
            fatherName,
            address,
            parentNumber

        })

        
        let url = process.env.NEXT_PUBLIC_BASE_URL;

        // send the mail to the user 

        await sendEmail(email,"VERIFY",newUser._id);
        

        return res.status(200).json({

            message:"user signup successfull",
            error:"null",
            success:"true",
            data:null

        })


    } catch (error:any) {

        console.log(error.message);

        return res.status(400).json({

            message: "Email already registered, Please login to continue",
            error: "Email already registered, Please login to continue",
            success: false,
            data: null

        });

    }
}



