
import { z } from "zod";

import { NextRequest, NextResponse } from "next/server";

import { isEmailAlreadyExist } from "@/helper/isEmailExists";

import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";


const loginSchema = z.object({

    email: z.string().email(),
    password: z.string().min(8),

});


export async function login(req: NextRequest, res: NextResponse) {

    try {

        const body = await req.json();

        try {

            loginSchema.parse(body);


        } catch (error: any) {

            console.log(error.message);


        }

        // fetch data from user body 

        const { email, password } = body;

        let isUserExists = await isEmailAlreadyExist(email);

        if (!isUserExists) {

            return NextResponse.json({

                message: "this user is not exists with this email address",
                data: "null",
                error: null,
                success: false,

            }, { status: 400 }
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

        let isPasswordMatch = await bcrypt.compare(password, isUserExists?.password);

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

        let tokenValue = {

            id: isUserExists?._id,
            email: isUserExists?.email,

        }


        const token = jwt.sign(tokenValue, process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string, {

            expiresIn: "24h",


        });

        const response = NextResponse.json({

            message: "Authentication successful",
            status: 200

        });


        console.log("");

        response.cookies.set("token", token, {

            httpOnly: true,

        });

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





