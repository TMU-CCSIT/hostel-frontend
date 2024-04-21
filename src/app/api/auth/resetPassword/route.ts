
import { NextRequest,NextResponse } from "next/server";

import {z} from "zod";

let resetPasswordSchema = z.object({

    newPassword:z.string(),
    confirmPassword:z.string()

})

export async function Post (req:NextRequest, res:NextResponse){

    try{

        const body = await req.json();

        try{

            resetPasswordSchema

        }catch(error:any){

            console.log(error.message);

        }


    }catch(error:any){

        console.log(error.message);

    }
}