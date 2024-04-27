

import User from "@/models/user.model";

import { NextRequest,NextResponse } from "next/server";

import { dbConnection } from "@/config/dbConfig";

dbConnection();

export async function POST(req: NextRequest, res: NextResponse){

    try{

        const body = await req.json();

        const {token} = body;

        console.log("token is ",token);

        // find the user using token 
        
        // const decodedToken = decodeURIComponent(token);
        
        // console.log("decoded token value  ",decodedToken);


        const isUserExists = await User.findOne({

            token:token as string,
            // verifyTokenExpiry: { $gt: Date.now() } // Corrected token expiry comparison

        })

        console.log(isUserExists);

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

        isUserExists.tokenExpiry = "";

        // isUserExists.tokenExpiry =;

        await isUserExists.save();

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






