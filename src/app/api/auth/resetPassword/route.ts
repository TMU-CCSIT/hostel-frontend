
import { NextRequest,NextResponse } from "next/server";

import { middleware } from "@/middleware";

import {z} from "zod";
import User from "@/models/User.model";

import bcrypt from "bcrypt";

let resetPasswordSchema = z.object({

    newPassword:z.string(),
    confirmPassword:z.string()

})

interface CustomNextRequest extends NextRequest {

    user: string;

}

export async function Post (req:CustomNextRequest, res:NextResponse){

    try{

        await middleware(req);

        const userId = req.user;

        const body = await req.json();

        if(!userId){

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

        try{

            resetPasswordSchema.parse(body);

        }catch(error:any){

            console.log(error.message);

        }


        const {newPassword,confirmPassword} = body;

        const isUserExists = await User.findOne({_id:userId});

        if(!isUserExists){

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

        // check the password 

        if(newPassword !== confirmPassword){

            return NextResponse
            .json(
                {
                    message: "paswword dosent match  ",
                    error: "",
                    data: null,
                    success: false,
                },
                {
                    status: 401
                }
            );
        }


        // hashed the password 


        const hashedPassword = await bcrypt.hash(newPassword, 10);


        const updateUser = await User.findByIdAndUpdate(isUserExists._id,{

            password:hashedPassword,

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


    }catch(error:any){

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


