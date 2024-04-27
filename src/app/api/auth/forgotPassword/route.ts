
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import bcrypt from "bcrypt";

import { sendMail } from "@/helper/sendMail";

const forgotPassword = z.object({

    newPassword: z.string(),
    confirmPassword: z.string(),
    token: z.string(),

})





export async function POST(req: Request, res: NextResponse) {


    try {


        const body = await req.json();

        try {

            const data = forgotPassword.parse(body);

        } catch (error: any) {

            console.log(error.message);

            return NextResponse.json({

                message: "all fields are not fullfilled ",
                data: null,
                error: error.message,

            }, {

                status: 400,

            })

        }


        // ftech the data 

        const { newPassword, confirmPassword, token } = body;


        if (newPassword !== confirmPassword) {


            return NextResponse.json({

                message: "password dosent match ",
                data: null,
                error: null,

            }, {

                status: 400,

            })

        }

        // find the user by using userId 

        const userExists = await User.findOne({

            token: token,


        });


        if (!userExists) {


            return NextResponse.json({

                message: "no user exists with this token",
                data: null,
                error: null,

            }, {

                status: 400,

            })


        }


        // check  user is verified or not 


        if (userExists && !userExists?.isVerified) {


            return NextResponse.json({

                message: "user is not verified plz verify first ",
                data: null,
                error: null,

            }, {

                status: 400,

            })


        }


        // hash the password


        const hashedPassword = await bcrypt.hash(newPassword, 8);

        // update the user  password 

        const updatedPassword = await User.findByIdAndUpdate(userExists._id, {

            password: hashedPassword,

        }, { new: true });



        // await sendMail(updatedPassword?.email,"resetPassword");


        // return the reponse 

        return NextResponse.json({

            message: "your password has been updated",
            error: null,
            data: updatedPassword,

        }, {

            status: 200,

        })


    } catch (error: any) {


        console.log(error.message);

        return NextResponse.json({

            message: "some error occured while forgot password",
            data: null,
            error: error.message,

        }, {

            status: 400,

        })


    }
}


