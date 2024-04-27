
import { z } from "zod";

import { NextRequest, NextResponse } from "next/server";

import { isEmailAlreadyExist } from "@/helper/isEmailExists";

import { dbConnection } from "@/config/dbConfig";

import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";

import Student from "@/models/student.model";

import { getDataFromToken } from "@/helper/getDataFromToken";

import User from "@/models/user.model";

import { ROLE } from "@/constants/constant";


const loginSchema = z.object({

    email: z.string().email(),
    password: z.string(),

});

dbConnection();


export async function POST(req: NextRequest, res: NextResponse) {

    try {

        const body = await req.json();

        try {

            loginSchema.parse(body);


        } catch (error: any) {

            console.log(error.message);

            return NextResponse.json({


                message:"all fields are not fULLFILLED",
                data:null,
                error:null,

            },{

                status:400,
            })


        }

        // fetch data from user body 

        const { email, password } = body;

        const isUserExists = await isEmailAlreadyExist(email);

        console.log("is user exists", isUserExists);

        if (!isUserExists) {

            
            return NextResponse.json(
                {
                    message: "this user is not exists with this email address",
                    data: null,
                    error: null,
                    success: false,

                },
                {
                    status: 400
                }
            )
        }

        // user exists but he is not verified 

        if (isUserExists && !isUserExists.isVerified) {

            return NextResponse.json({

                message: "user is not verified",
                data: "null",
                error: null,
                success: false,

            }, { status: 400 }
            )

        }

        // compare the password
        const isPasswordMatch = await bcrypt.compare(password, isUserExists?.password);

        if (!isPasswordMatch) {

            return NextResponse.json({

                message: "password is not match",
                data: "null",
                error: null,
                success: false,

            }, { status: 400 }
            )
        }

        // create token
        const tokenValue = {

            id: isUserExists._id,
            email: isUserExists.email,
            profileImage: isUserExists.profileImage,
            role: isUserExists.role,
        }

        const token = jwt.sign(
            tokenValue,
            process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string,
            {
                expiresIn: "24h",
            }
        );

        const user = await User
            .findById(isUserExists._id)
            .select("_id email profileImage fullName");

        const response = NextResponse.json({
            message: "User loggedin successfully",
            status: 200,
            data: isUserExists,
            error: null,
        });

        response.cookies.set(
            "token",
            token,
            {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            }
        );

        return response;


    } catch (error: any) {

        console.log(error.message);

        return NextResponse.json({

            message: "some error occur while login ",
            data: "null",
            error: error.message,
            success: false,

        }, { status: 400 }

        )

    }
}



export async function GET(req: NextRequest, res: NextResponse) {

    try {

        // get data from the token

        const studentId = getDataFromToken(req);

        let isStudentExists = await Student.findById(studentId);


        if (!isStudentExists) {

            return NextResponse.json({

                message: "no user exists with user id ",
                data: "null",
                error: "",
                success: false,

            }, { status: 400 })
        }

        // sucessfully return the resposne 

        return NextResponse.json({

            message: "sucessfully find the user ",
            data: "null",
            error: "",
            success: true,

        }, { status: 200 })


    } catch (error: any) {


        console.log(error.message);

        return NextResponse.json({

            message: "some error occur while login ",
            data: "null",
            error: error.message,
            success: false,

        }, { status: 400 }

        )

        console.log(error.message);

    }
}





