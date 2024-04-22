
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

            resetPasswordSchema.parse(body);

        }catch(error:any){

            console.log(error.message);

        }


        const {newPassword,confirmPassword} = body;


    }catch(error:any){

        console.log(error.message);

    }
}