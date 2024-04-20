

import User from "@/models/user.model";

import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){

    try{

        const body = await req.json();

        const {token} = body;

        // find the user using token 

        let isUserExists = await User.findOne({

            token:token,

        })

        if(!isUserExists){

            return NextResponse

                .json(
                    {
                        message: "no user exists with this token ",
                        error: "",
                        data: null,
                        success: false,
                    }, {
                    status: 401
            });
        }

        // is user exists 

        isUserExists.isVerified = true;

        isUserExists.token = "";

        // isUserExists.tokenExpiry =;

         return NextResponse

        .json(
            {
                message: "user is sccessfully verified  ",
                error: "",
                data: null,
                success: true,
            }, {
            status: 200
    });



    }catch(error:any){

        console.log(error.message);

        return NextResponse

        .json(
            {
                message: "som error occur while verifying user",
                error: "",
                data: null,
                success: false,
            }, {
            status: 400
    });

    }
}


