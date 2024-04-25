
import { NextRequest, NextResponse } from "next/server";

import { middleware } from "@/middleware";

import {z} from "zod";
import User from "@/models/user.model";


import bcrypt from "bcrypt";

let resetPasswordSchema = z.object({

    oldPassword: z.string(),
    newPassword: z.string()

})

interface CustomNextRequest extends NextRequest {

    user: string;

}



export async function POST(req: CustomNextRequest, res: NextResponse) {

    try {

        
        await middleware(req);

        const userId = req.user;

        const body = await req.json();

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

        try {

            resetPasswordSchema.parse(body);

        } catch (error: any) {

            console.log(error.message);

            return NextResponse
            .json(
                {
                    message: "field are not correct  ",
                    error: error.message,
                    data: null,
                    success: false,
                },
                {
                    status: 401
                }
            );

        }


        const { newPassword, oldPassword } = body;

        console.log(newPassword,oldPassword);

        const isUserExists = await User.findOne({ _id: userId });

        if (!isUserExists) {

            return NextResponse
                .json(
                    {
                        message: "no user exists with this user id  ",
                        error: "",
                        data: null,
                        success: false,
                    },
                    {
                        status: 401
                    }
                );

        }


        const isPasswordMatch = await bcrypt.compare(oldPassword, isUserExists.password);

        if (!isPasswordMatch) {


            return NextResponse
                .json(
                    {
                        message: "your password is and existing pasword not matches",
                        error: "",
                        data: null,
                        success: false,
                    },
                    {
                        status: 401
                    }
                );

        }

        
        // if the pasword matches 

        // hashed the password 

        const hashedPassword = await bcrypt.hash(newPassword, 10);


        const updateUser = await User.findByIdAndUpdate(isUserExists._id, {

            password: hashedPassword,

        })

        return NextResponse
            .json(
                {
                    message: "sucessfully upadte user password  ",
                    error: "",
                    data: updateUser,
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
                    message: "error occurred ",
                    error: error.message,
                    data: null,
                    success: false,
                },
                {
                    status: 400
                }
            );
    }
}




